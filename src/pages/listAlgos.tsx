interface Pokemon {
  name: string;
  url: string;
}

interface ListAlgosProps {
  setList: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  backupList: Pokemon[];
  list: Pokemon[];
}

const ListAlgos: React.FC<ListAlgosProps> = ({ setList, backupList, list }) => {
  const sortAlpha = () => {
    const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
    setList(sortedList);
  };

  const reverseAlpha = () => {
    const sortedList = [...backupList].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setList(sortedList);
  };

  const resetAlgo = () => {
    setList([...backupList]);
  };

  const sortGen = (genNumber: number | null) => {
    if (genNumber === null) {
      return;
    }
    if (genNumber === 1) {
      const genList = backupList.slice(0, 151);
      setList(genList);
    }
    if (genNumber === 2) {
      const genList = backupList.slice(151, 251);
      setList(genList);
    }
    if (genNumber === 3) {
      const genList = backupList.slice(251, 386);
      setList(genList);
    }
    if (genNumber === 4) {
      const genList = backupList.slice(386, 493);
      setList(genList);
    }
    if (genNumber === 5) {
      const genList = backupList.slice(493, 649);
      setList(genList);
    }
    if (genNumber === 6) {
      const genList = backupList.slice(649, 721);
      setList(genList);
    }
    if (genNumber === 7) {
      const genList = backupList.slice(721, 809);
      setList(genList);
    }
    if (genNumber === 8) {
      const genList = backupList.slice(809, 905);
      setList(genList);
    }
    if (genNumber === 9) {
        const genList = backupList.slice(905, 1017);
        setList(genList);
      }
  };

  const generationOptions = Array.from({ length: 9 }, (_, index) => ({
    value: (index + 1).toString(),
    label: `Generation ${index + 1}`,
  }));

  return (
    <>
      <button onClick={resetAlgo}>Reset</button>
      <button onClick={sortAlpha}>Sort Alphabetically</button>
      <button onClick={reverseAlpha}>Sort Reverse Alphabetically</button>

      <div>
        <label htmlFor="dropdown">Select a generation:</label>
        <select id="dropdown" onChange={(e) => sortGen(Number(e.target.value))}>
          <option value="">Select a generation</option>
          {generationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ListAlgos;
