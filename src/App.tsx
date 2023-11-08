import { ReactElement, ReactNode, useState } from 'react'
import './App.css'


function ConventionalHeading({ title }: { title?: string }) {
  return <h1>{title}</h1>
}


// -------------  Child Type = ReactNode, returns ReactElement  ------------------------
// React.ReactNode is ReactElement or string or whateverish 
// ReactElement is object with type and props

function HeadingWithChildren({ children }: { children: ReactNode }): ReactElement {
  return <h1>{children}</h1>
}


// -------------  DefaultProps -----------------

// define default prop 
const defaultContainerProps = {
  heading: <strong>My Default Heading</strong>
}

// define Component prop TYPE (and typeof defined default )
type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;

function Container({
  heading,
  children
}: ContainerProps): ReactElement {
  return (
    <div>
      <h2>{heading}</h2>
      {children}
    </div>)
}

// SET Component defaults
Container.defaultProps = defaultContainerProps;



// -------------  Functional props ---------------
function TextWithNumber({
  header,
  children
}: {
  header?: (num: number) => ReactNode //Header? Optional
  children: (num: number) => ReactNode //function type takes number param => ReactNode
}) {
  const [state, setState] = useState<number>(1);


  return (
    <div>
      <div>
        {/* Optional Header ?. syntax  */}
        {header && <h3>{header?.(state)}</h3>} 

        {/* pass state argument value into child function parameter */}
        <h3>{children(state)}</h3> 
      </div>
      <div>
        <button onClick={() => setState(state + 1)}>Add</button>
      </div>
    </div>
  )
}

// -------------  Render Generic List ------------------------------
function RenderGenericList<ListItemType>({
  items,
  render
}: {
  items: ListItemType[], //array of item types
  render: (item: ListItemType) => ReactNode //function takes single item type => Node
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  )
}


function App() {


  return (
    <>
      <ConventionalHeading
        title={"Hello there"} />

      <HeadingWithChildren>
        <strong>ReactElement</strong>
      </HeadingWithChildren>

      <Container>
        <strong>DefaultProps</strong>
      </Container>

      <TextWithNumber
        header={(num: number) => <strong>Header {num}</strong>}
      >
        {/* define child function argument (which already has state value passed in in Component function) */}
        {(num: number) => <div>Todays number is {num}</div>}
      </TextWithNumber>

      <RenderGenericList
        items={["one", "two", "three"]}
        render={(item: string) => <p>{item.toUpperCase()}</p>}
      ></RenderGenericList>

      <RenderGenericList
        items={[1, 2, 3]}
        render={(item: number) => <p>{item * 100}</p>}
      ></RenderGenericList>





    </>
  )
}

export default App
