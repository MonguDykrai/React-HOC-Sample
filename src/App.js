import React, { useEffect, useState } from 'react';
import './style.css';
import jsxToString from 'jsx-to-string';
import Prism from 'prismjs';
// import 'prismjs/themes/prism-dark.css';
// import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-okaidia.css';

Prism.theme = 'dark';

function HOC(Component) {
  return function (props) {
    return <Component {...props} />;
  };
}

function PlainButton({ children, style }) {
  return <button style={style}>{children}</button>;
}
const HOCButton = HOC(PlainButton);

HOCButton.displayName = 'HOCButton';

HOCButton.defaultProps = {
  style: {
    background: 'rgba(0, 0, 0, 0.2)',
  },
  children: '默认文字',
};

const Components = {
  HOCButton,
};

export default function App() {
  const [ComponentTree, setComponentTree] = useState([]);
  useEffect(() => {
    setComponentTree([
      ...ComponentTree,
      {
        name: 'HOCButton',
        nodeId: 'abc',
        parent: null,
        props: Components['HOCButton'].defaultProps,
        children: [
          {
            name: 'HOCButton',
            nodeId: 'abcd',
            parent: null,
            props: Components['HOCButton'].defaultProps,
            children: [
              {
                name: 'HOCButton',
                nodeId: 'abcd23',
                parent: null,
                props: Components['HOCButton'].defaultProps,
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: 'HOCButton',
        nodeId: 'abcde',
        parent: null,
        props: Components['HOCButton'].defaultProps,
        children: [],
      },
    ]);
  }, []);

  const Traverse = (tree) => {
    return tree.map((leaf) => {
      const Component = Components[leaf.name];
      return (
        <Component key={leaf.nodeId} {...leaf.props}>
          {leaf.children?.length === 0
            ? leaf.props.children
            : Traverse(leaf.children)}
        </Component>
      );
    });
  };

  return (
    <>
      <div>
        <h1>Hello StackBlitz!</h1>
        <p>Start editing to see some magic happen :)</p>
        <PlainButton style={{ color: 'green' }}>hello</PlainButton>
        <HOCButton style={{ color: 'red' }}>world</HOCButton>
        {Traverse(ComponentTree)}
      </div>
      {/* <pre>
        {jsxToString(
          <div>
            <h1>Hello StackBlitz!</h1>
            <p>Start editing to see some magic happen :)</p>
            <PlainButton style={{ color: 'green' }}>hello</PlainButton>
            <HOCButton style={{ color: 'red' }}>world</HOCButton>
            {Traverse(ComponentTree)}
          </div>
        )}
      </pre> */}
      <section style={{ background: 'rgb(103, 96, 96)', padding: 6 }}>
        {/* <section> */}
        <pre
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              jsxToString(
                <div>
                  <h1>Hello StackBlitz!</h1>
                  <p>Start editing to see some magic happen :)</p>
                  <PlainButton style={{ color: 'green' }}>hello</PlainButton>
                  <HOCButton style={{ color: 'red' }}>world</HOCButton>
                  {Traverse(ComponentTree)}
                </div>
              ),
              Prism.languages.javascript,
              'javascript'
            ),
          }}
        ></pre>
      </section>
    </>
  );
}
