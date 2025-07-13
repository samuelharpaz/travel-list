import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(i => i.id !== id));
  }

  function handleToggleUpdatePacking(id) {
    setItems(items =>
      items.map(item => {
        return item.id !== id ? item : { ...item, packed: !item.packed };
      })
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleUpdatePacking={handleToggleUpdatePacking} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 🤩</h3>
      <div className="actions">
        <select name="num-items" id="num-items" value={quantity} onChange={e => setQuantity(+e.target.value)}>
          {Array.from({ length: 20 }, (_, idx) => idx + 1).map(num => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item&hellip;"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleUpdatePacking }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleUpdatePacking={onToggleUpdatePacking} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleUpdatePacking }) {
  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={() => onToggleUpdatePacking(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%).</em>
    </footer>
  );
}
