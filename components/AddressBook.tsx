import React, { useState, useEffect } from 'react';
import { Book, Plus, Trash2 } from 'lucide-react';

interface AddressEntry {
  id: string;
  label: string;
  address: string;
}

const ADDRESS_BOOK_KEY = 'aix_address_book';

const AddressBook: React.FC = () => {
  const [entries, setEntries] = useState<AddressEntry[]>([]);
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(ADDRESS_BOOK_KEY);
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const addEntry = () => {
    if (!label || !address) return;
    const newEntry = { id: Date.now().toString(), label, address };
    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem(ADDRESS_BOOK_KEY, JSON.stringify(updated));
    setLabel('');
    setAddress('');
  };

  const removeEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem(ADDRESS_BOOK_KEY, JSON.stringify(updated));
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
        <Book className="text-emerald-500" /> ADDRESS BOOK
      </h2>
      <div className="space-y-2 mb-4">
        <input 
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label (e.g. Exchange)"
          className="w-full bg-black border border-zinc-700 p-2 rounded text-sm"
        />
        <input 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="XRPL Address"
          className="w-full bg-black border border-zinc-700 p-2 rounded text-sm"
        />
        <button onClick={addEntry} className="w-full bg-emerald-600 hover:bg-emerald-500 p-2 rounded text-sm flex items-center justify-center gap-2">
          <Plus size={16} /> ADD ADDRESS
        </button>
      </div>
      <div className="space-y-2">
        {entries.map(entry => (
          <div key={entry.id} className="bg-black p-2 rounded border border-zinc-800 flex justify-between items-center text-sm">
            <div>
              <span className="block text-emerald-500 text-xs">{entry.label}</span>
              <span className="font-mono">{entry.address.substring(0, 10)}...</span>
            </div>
            <button onClick={() => removeEntry(entry.id)} className="text-zinc-500 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
