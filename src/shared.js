import { DateTime } from "luxon";

export const selectRenderer = ({ field }, items, placeholder, value, label) => {
  return (
    <select {...field}>
      <option>{placeholder}</option>
      {items.map((opt) => (
        <option key={opt[value]} value={Number(opt[value])}>
          {opt[label]}
        </option>
      ))}
    </select>
  );
};

export const selectDisplayRenderer = (props, items, value, label) => {
  return (
    <div>{items.find((l) => l[value] === props[value])?.[label] || ""}</div>
  );
};

export const dateRenderer = ({ field }, name) => {
  return <input {...field} type={"datetime-local"} />;
};

export const dateDisplayRenderer = (props, name) => {
  return <div>{DateTime.fromISO(props[name]).toFormat("dd LLL yyyy")}</div>;
};

export const styles = {
  container: { margin: "auto", width: "fit-content" },
};
