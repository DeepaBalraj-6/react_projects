import  { useEffect, useState } from 'react';
import staffData from '../data/staff.json';

export function Todo()
{
    const [task,setTask]=useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddTask=()=>{
        if(taskInput.trim()==='')return;
        if(editingIndex !== null){
            const updateTask=[...task];
            updateTask[editingIndex] = taskInput;

            setTask(updateTask);
            setEditingIndex(null);
        }
        else {
        
        setTask([...task, taskInput]);
        }
       setTaskInput('');
    };

    const handleDeleteTask=(index)=>{
        const updateTask=task.filter((_, i) => i !== index);
        setTask(updateTask);

        if(editingIndex===index){
            setTaskInput('');
            setEditingIndex(null);
        }
    };

    const handleEditTask=(index)=>{
        setTaskInput(task[index]);
        setEditingIndex(index);
    };

    return (
        <div className='container'>
            <h2>To-Do</h2>
            <input 
            type="text" 
            placeholder="Enter here..." 
            className="taskInput"
            value={taskInput}
            onChange={(e)=>setTaskInput(e.target.value)}
            />
            <button 
            className="addBtn"
            onClick={handleAddTask}>
                {editingIndex===null?'Add':'Update'}</button>
            <ul className="list">
                {task.map((task,index) => (
                    <li key={index}>
                        {task}
                        <div className='btns'>
                            <button className='editBtn' onClick={() => handleEditTask(index)}>Edit</button>
                            <button className='deleteBtn' onClick={() => handleDeleteTask(index)}>Delete</button>
                        </div>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function Calculator()
{
    const [input,setInput]=useState('');

    const clear=()=>{
        setInput('');
    }

    const delet=()=>{
        setInput((prev) => prev.slice(0, -1));
    }

    const add=(value)=>{
        setInput((pre)=>pre+value);
    };

    const calculate=()=>{
        const result = eval(input);
        setInput(result.toString());
    }

    return (
        <div className='container'>
            <h2>Calculator</h2>
            <div className='calci-container'>
                <input className='calciInput' type='text' value={input} readOnly/>
                <div className='calci-btns'>
                    <button onClick={clear} className='ac'>AC</button>
                    <button onClick={()=>delet()} className='del'>DEL</button>
                    <button onClick={()=>add('%')}>%</button>
                    <button onClick={()=>add('/')}>/</button>
                    <button onClick={()=>add('7')}>7</button>
                    <button onClick={()=>add('8')}>8</button>
                    <button onClick={()=>add('9')}>9</button>
                    <button onClick={()=>add('*')}>*</button>
                    <button onClick={()=>add('4')}>4</button>
                    <button onClick={()=>add('5')}>5</button>
                    <button onClick={()=>add('6')}>6</button>
                    <button onClick={()=>add('-')}>-</button>
                    <button onClick={()=>add('1')}>1</button>
                    <button onClick={()=>add('2')}>2</button>
                    <button onClick={()=>add('3')}>3</button>
                    <button onClick={()=>add('+')}>+</button>
                    <button onClick={()=>add('0')} className='zero'>0</button>
                    <button onClick={()=>add('.')}>.</button>
                    <button onClick={calculate}>=</button>
                    
                </div>
            </div>
        </div>
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function CurrencyConvertor()
{
  const [amount,setAmount]=useState(null);
  const [fromCurrency,setFromCurrency]=useState('inr');
  const [toCurrency,setToCurrency]=useState('usd');
  const [rate,setRate]=useState(null);
  const [final,setFinal]=useState(null);

  useEffect(()=>{

    const date='latest';
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${fromCurrency}.json`;

    
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('No response');
        }
        return res.json();
      })
      .then((data)=>{
        if(data[fromCurrency] && data[fromCurrency][toCurrency])
        {
            setRate(data[fromCurrency][toCurrency]);
            setFinal((rate*amount).toFixed(2));
        }
      })
  }, [fromCurrency, toCurrency, amount]
)

    return(
        <div className='cc-container'>
            <h2>Currency Convertor</h2>
            <div>
                <input type='number' className='ccInput' placeholder='Enter Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                <select value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}>
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="eur">EUR</option>
                    <option value="jpy">JPY</option>
                </select>
                <select value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}>
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="eur">EUR</option>
                    <option value="jpy">JPY</option>
                </select>
            </div>
            <div>
                <p>{amount} {fromCurrency.toUpperCase()}={final} {toCurrency.toUpperCase()}</p>
            </div>
            
        </div>
    );
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function WorkAllocator() {
    const [count, setCount] = useState('');
    const [sp, setSp] = useState(null);
    const [date, setDate] = useState(null);
    const [total, setTotal] = useState(0);
    const [name, setName] = useState([]);

    const get = () => {
        if (!sp || !date || !count) {
            alert('Give Details');
            return;
        }

        const filtered = staffData.filter((s) => s.subject === sp);
        const selected = filtered.map((s) => s.name).slice(0, Number(count));

        setName(selected);
        setTotal(selected.length);
    };

    return (
        <div className="wa-container">
            <div className="wa-form">
                <div className="wa-row">
                    <label>Count</label>
                    <input type='number' value={count} onChange={(e) => setCount(e.target.value)} placeholder="Enter count" />
                </div>
                <div className="wa-row">
                    <label>Specification</label>
                    <select value={sp} onChange={(e) => setSp(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value="tamil">Tamil</option>
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="math">Math</option>
                        <option value="physics">Physics</option>
                        <option value="chemistry">Chemistry</option>
                        <option value="botony">Botony</option>
                        <option value="zoology">Zoology</option>
                        <option value="computerScience">Computer Science</option>
                        <option value="history">History</option>
                        <option value="accounts">Accounts</option>
                        <option value="commerce">Commerce</option>
                        <option value="economics">Economics</option>
                    </select>
                </div>
                <div className="wa-row">
                    <label>Date</label>
                    <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="wa-button-container">
                    <button onClick={get}>Get</button>
                </div>
            </div>

            <div className="wa-result-box">
                <h5>Total Staff</h5>
                <h6>{total}</h6>
                <h5>Staff Name</h5>
                <ul>
                    {name.map((n, i) => (
                        <li key={i}>{n}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function CountryLens() {
    const [country, setCountry] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const get = () => {
        if (!country.trim()) {
            setError('The input field cannot be empty');
            setData(null);
            return;
        }

        const url = `https://restcountries.com/v3.1/name/${country.trim()}?fullText=true`;

        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error('Country Not Found');
                return response.json();
            })
            .then((resData) => {
                if (!resData || resData.length === 0) {
                    setError('Enter a valid country name!');
                    setData(null);
                } else {
                    setError(null);
                    setData(resData[0]);
                }
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            });
    };

    const extractCurrency = (currencies) => {
        if (!currencies) return 'N/A';
        const currencyKey = Object.keys(currencies)[0];
        const currency = currencies[currencyKey];
        return `${currency.name} (${currency.symbol || '-'})`;
    };

    const extractLanguages = (languages) => {
        if (!languages) return 'N/A';
        return Object.values(languages).join(', ');
    };

    return (
        <div className='cl-container'>
            <div>
                <p>Enter Country</p>
                <input
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button onClick={get}>Go</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {data && (
                <div className="country-info">
                    <h3>{data.name.common}</h3>
                    <p><strong>Official Name:</strong> {data.name.official}</p><br/>
                    <p><strong>Capital:</strong> {data.capital?.[0] || 'N/A'}</p><br/>
                    <p><strong>Region:</strong> {data.region}</p><br/>
                    <p><strong>Currency:</strong> {extractCurrency(data.currencies)}</p><br/>
                    <p><strong>Language(s):</strong> {extractLanguages(data.languages)}</p><br/>
                    <img src={data.flags.png} alt="Flag" width="150" />
                </div>
            )}
        </div>
    );
}

