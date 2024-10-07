import { Highlight, themes } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';
import { omit } from 'radash';

interface CodeBlockProps {
  children: string;
  className: string;
  onClick?: (event: React.MouseEvent) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = props => {
  if (!props || !props.children || typeof props.children !== 'string') return null;
  const { children, className } = props;
  const language = className?.replace(/language-/, '') || ('' as Language);
  return (
    <div onClick={props.onClick}>
      <Highlight code={children.trim()} language={language} theme={themes.nightOwlLight}>
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
