import { observer } from "mobx-react-lite";
import { Instance, types } from "mobx-state-tree";
import "./styles.css";

const ModelA = types.model({
  id: types.identifier,
  value: types.string
});

const modelA = ModelA.create({ value: "model a", id: "1" });

const Parent = () => {
  const ModelB = types
    .model({
      value: types.string,
      ref: types.safeReference(ModelA)
    })
    .actions((self) => ({
      updateValue: (newRef: Instance<typeof ModelA>) => {
        self.value = "updated";
        self.ref = newRef;
      }
    }));

  const modelB = ModelB.create({ value: "test" });

  interface ChildProps {
    model: Instance<typeof ModelB>;
  }

  const Child = observer(({ model: { value, updateValue } }: ChildProps) => {
    return (
      <div>
        <button onClick={() => updateValue(modelA)}>update</button>
        <span>{value}</span>
      </div>
    );
  });

  return <Child model={modelB}></Child>;
};

export default function App() {
  return <Parent></Parent>;
}
