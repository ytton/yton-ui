import clsx from 'clsx';
import { Highlight, themes } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';
import { omit } from 'radash';

interface CodeBlockProps {
  children?: string;
  code?: string;
  className?: string;
  language: Language;
  onClick?: (event: React.MouseEvent) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = props => {
  const realCode = props.code || props.children;
  if (!realCode || typeof realCode !== 'string') return null;
  const language = props.language;
  return (
    <div onClick={props.onClick} className={clsx('[&>pre]:px-2', props.className)}>
      <Highlight code={realCode.trim()} language={language} theme={themes.nightOwlLight}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...omit(getLineProps({ line, key: i }), ['key'])}>
                {line.map((token, key) => (
                  <span key={key} {...omit(getTokenProps({ token, key }), ['key'])} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
