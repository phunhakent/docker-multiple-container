import React from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [index, setIndex] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      // fetch values
      const valuesResonse = await axios.get("/api/values/current");
      setValues(valuesResonse.data);

      // fetch indexes
      const seenIndexesResponse = await axios.get("/api/values");
      setSeenIndexes(seenIndexesResponse.data);
    };

    fetchData();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    const response = await axios.post("/api/values", { index });
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="index">Enter your index</label>
            <input
              name="index"
              type="text"
              value={index}
              onChange={e => setIndex(e.target.value)}
            />
            <button type="submit">submit deee</button>
          </div>
        </form>
      </div>
      <div>
        <h4>Indexes I have seen:</h4>
        <div>{seenIndexes.map(x => x.number).join(", ")}</div>
      </div>
      <div>
        <h4>Calculated values:</h4>
        <div>
          {Object.entries(values).map(([key, value]) => (
            <div key={key}>{`For index ${key} I calculated ${value}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fib;
