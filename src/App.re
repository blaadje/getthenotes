let component = ReasonReact.statelessComponent("App");

let array = [1, 2, 3, 4]

let make = _ => {
  ...component,
  render: _ => (
    <Pattern />,
  )
};