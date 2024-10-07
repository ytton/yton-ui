import useControllableValue from '@/hooks/useControllableValue';
import { MouseEvent, useCallback, useRef } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { nanoid } from 'nanoid';
import Icon from '../Icon';
import { cn } from '@/utils/utils';
import { motion } from 'framer-motion';
import { AnyType } from '@/types';

export interface UploadProps {
  action: string;
  children: React.ReactNode;
  name?: string;
  multiple?: boolean;
  fileList?: FileItem[];
  defaultFileList?: FileItem[];
  accept?: string;
  headers?: { [key: string]: string };
  data?: Record<string, AnyType>;
  onChange?: (file: FileItem, fileList: FileItem[]) => void;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  onRemove?: (file: FileItem) => void;
}

export interface FileItem {
  uid: string;
  name: string;
  status?: 'uploading' | 'success' | 'error' | 'removed'; // 上传之前，返回false，则状态为undefined
  percent?: number;
  url?: string;
  raw: File;
  cancelToken?: CancelTokenSource;
  response?: AnyType;
  error?: string;
}

function Upload(props: UploadProps) {
  const {
    action,
    children,
    name = 'file',
    multiple,
    onChange,
    beforeUpload,
    onRemove,
    fileList,
    defaultFileList = [],
    accept,
    data = {},
    headers
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [fileListState, setFileListState] = useControllableValue([], {
    value: fileList,
    defaultValue: defaultFileList
  });
  const updateFileList = useCallback(
    (file: FileItem) => {
      setFileListState(fileListState => {
        if (file.status === 'removed') {
          const res = fileListState.filter(item => item.uid !== file.uid);
          onChange?.(file, res);
          return res;
        }

        const index = fileListState.findIndex(item => item.uid === file.uid);
        const newFileList = [...fileListState];
        if (index > -1) {
          newFileList.splice(index, 1, file);
        } else {
          newFileList.push(file);
        }
        onChange?.(file, newFileList);
        return newFileList;
      });
    },
    [setFileListState, onChange]
  );
  const uploadApi = (file: FileItem) => {
    const formData = new FormData();
    formData.append(name, file.raw);
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    const cancelToken = axios.CancelToken.source();
    updateFileList({
      ...file,
      status: 'uploading',
      cancelToken
    });

    return axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        cancelToken: cancelToken.token,
        onUploadProgress: progressEvent => {
          const { loaded, total } = progressEvent;
          const percentage = Math.round((loaded * 100) / total!); // 计算上传百分比
          file.percent = percentage;
          handleOnProgress(file);
        }
      })
      .catch(err => {
        throw new Error(axios.isCancel(err) ? '上传被取消' : err.message || '上传失败');
      });
  };
  const uploadFile = (file: FileItem) => {
    uploadApi(file)
      .then(res => {
        updateFileList({
          ...file,
          status: 'success',
          response: res
        });
      })
      .catch(err => {
        if (err.message === '上传被取消') {
          return;
        }
        updateFileList({
          ...file,
          status: 'error',
          error: err.message || '上传失败'
        });
      });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const postFiles = Array.from(files);
    postFiles.forEach(async file => {
      if (beforeUpload) {
        try {
          const res = await beforeUpload(file);
          if (res) uploadFile({ raw: file, uid: nanoid(10), status: 'uploading', name: file.name });
        } catch {
          updateFileList({
            raw: file,
            uid: nanoid(10),
            name: file.name
          });
        }
      } else {
        uploadFile({ raw: file, uid: nanoid(10), status: 'uploading', name: file.name });
      }
    });
  };

  const handleOnClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleOnProgress = (fileItem: FileItem) => {
    updateFileList(fileItem);
  };
  const getFileIcon = (file: FileItem) => {
    if (!file.status) return 'mdi:file-outline';
    const fileStatusIconMap = {
      removed: 'mdi:file-outline',
      success: 'mdi:file-outline',
      error: 'mdi:file-outline',
      uploading: 'mdi:loading'
    };
    return fileStatusIconMap[file.status];
  };
  const getFileStatusColor = (file: FileItem) => {
    if (!file.status) return '';
    const fileStatusColorMap = {
      removed: '',
      success: '',
      error: 'text-red-500',
      uploading: ''
    };
    return fileStatusColorMap[file.status];
  };
  const handleOnRemove = (e: MouseEvent, fileItem: FileItem) => {
    e.stopPropagation();
    fileItem.status = 'removed';
    updateFileList(fileItem);
    fileItem.cancelToken?.cancel();
    onRemove?.(fileItem);
  };

  return (
    <div>
      <div className="inline-block" onClick={handleOnClick}>
        {children}
      </div>
      <div className="flex flex-col gap-2 mt-2" onClick={e => e.stopPropagation()}>
        {fileListState.map(file => (
          <motion.div
            key={file.uid}
            className={cn('group flex items-center gap-1 pl-2 py-1 hover:bg-gray-100', getFileStatusColor(file))}
          >
            <Icon icon={getFileIcon(file)} className={cn({ 'animate-spin': file.status === 'uploading' })} />
            <div className={cn('relative flex-1 flex items-center gap-1')}>
              <div>{file.name}</div>
              <Icon
                icon="mdi:close"
                onClick={e => handleOnRemove(e, file)}
                className={cn('group-hover:block hidden ml-auto mr-2 cursor-pointer text-black/80 ', [
                  file.status === 'error' && 'text-red-500 block'
                ])}
              />
              {file.status === 'uploading' && (
                <div className="w-full absolute bottom-0 left-0 h-[2px] translate-y-2 bg-gray-200">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${file.percent || 0}%` }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <input
        type="file"
        ref={inputRef}
        value={[]}
        accept={accept}
        multiple={multiple}
        name={name}
        onChange={handleOnChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default Upload;
