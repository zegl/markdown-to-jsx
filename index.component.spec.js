import Markdown from './index';
import React from 'react';
import ReactDOM from 'react-dom';

const root = document.body.appendChild(document.createElement('div'));

function render(jsx) {
  return ReactDOM.render(jsx, root);
}

afterEach(() => ReactDOM.unmountComponentAtNode(root));

it('accepts markdown content', () => {
  render(<Markdown>_Hello._</Markdown>);

  expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  Hello.
</em>

`);
});

it('handles a no-children scenario', () => {
  render(<Markdown>{''}</Markdown>);

  expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
</span>

`);
});

it('accepts options', () => {
  class FakeParagraph extends React.Component {
    render() {
      return <p className="foo">{this.props.children}</p>;
    }
  }

  render(
    <Markdown options={{ overrides: { p: { component: FakeParagraph } } }}>
      _Hello._
    </Markdown>
  );

  expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  Hello.
</em>

`);
});

it('merges className overrides, rather than overwriting', () => {
  const code = ['```js', 'foo', '```'].join('\n');

  render(
    <Markdown
      options={{
        overrides: { code: { props: { className: 'foo' } } },
      }}
    >
      {code}
    </Markdown>
  );

  expect(root.innerHTML).toMatchInlineSnapshot(`

<pre data-reactroot>
  <code class="lang-js foo">
    foo
  </code>
</pre>

`);
});

it('passes along any additional props to the rendered wrapper element', () => {
  render(<Markdown className="foo"># Hello</Markdown>);

  expect(root.innerHTML).toMatchInlineSnapshot(`

<h1 data-reactroot
    id="hello"
    class="foo"
>
  Hello
</h1>

`);
});
