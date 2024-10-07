import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Button from './index';
describe('按钮 Button', () => {

  it('基础用法', () => {
    const onClick = vi.fn();
    const { getByText } = render(<Button onClick={onClick}>Click Me</Button>);
    const buttonElement = getByText(/Click Me/i);
    expect(buttonElement, '按钮未能渲染').toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(onClick, '点击事件未能触发').toHaveBeenCalledTimes(1);
    expect(buttonElement, '按钮基础样式不对').toMatchInlineSnapshot(`
      <button
        class="inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none border border-gray-200 [&:not(:disabled)]:hover:border-primary [&:not(:disabled)]:hover:text-primary px-4 py-2.5 rounded-md"
      >
        Click Me
      </button>
    `)
  });

  it('禁用按钮', () => {
    const onClick = vi.fn();
    const { getByText } = render(<Button disabled onClick={onClick}>Click Me</Button>);
    const buttonElement = getByText(/Click Me/i);
    expect(buttonElement, '按钮未能渲染').toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(onClick, '禁用未能组件点击事件').toHaveBeenCalledTimes(0);
  })

  it("主要按钮",()=>{
    const { getByText } = render(<Button type="primary">Primary</Button>);
    const buttonElement = getByText(/Primary/i);
    expect(buttonElement, '按钮未能渲染').toBeInTheDocument();
    expect(buttonElement, '按钮主要样式不对').toMatchInlineSnapshot(`
      <button
        class="inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none bg-blue-500 text-white [&:not(:disabled)]:hover:bg-blue-400 [&:not(:disabled)]:active:bg-blue-600 px-4 py-2.5 rounded-md"
      >
        Primary
      </button>
    `)
  })

  it("块级按钮",()=>{
    const { getByText } = render(<Button block>Block</Button>);
    const buttonElement = getByText(/Block/i);
    expect(buttonElement, '按钮未能渲染').toBeInTheDocument();
    expect(buttonElement, '按钮块级样式不对').toHaveClass('w-full')
  })

  it("危险按钮",()=>{
    const { getByText } = render(<Button danger>Danger</Button>);
    const buttonElement = getByText(/Danger/i);
    expect(buttonElement, '按钮未能渲染').toBeInTheDocument();
    expect(buttonElement, '按钮危险样式不对').toHaveClass('text-red-500 border-red-500 [&:not(:disabled)]:hover:border-red-500 [&:not(:disabled)]:hover:text-red-500')
  })
});
