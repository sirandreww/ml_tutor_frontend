import React, { useState } from 'react';
import './algorithms.css';
import './GradientDescent.css';

function Algorithms() {
    const tasks_name = ['Note Book', 'Demo 1D', 'Step-By-Step 1D', 'Demo 2D', 'Step-By-Step 2D', 'HyperParameter']
    var res = []
    for (let index = 0; index < tasks_name.length; index++) {
        res[index] = index;
        
    }
    const [t0, setTask0] = useState(false);
    const [t1, setTask1] = useState(false);
    const [t2, setTask2] = useState(false);
    const [t3, setTask3] = useState(false);
    const [t4, setTask4] = useState(false);
    const [t5, setTask5] = useState(false);
  
    var tasks_setters = [setTask0, setTask1, setTask2, setTask3, setTask4, setTask5]
    const disableAll = () => {
        tasks_setters.forEach(setter => setter(false))
    }

    return (
        <div className='algorithms-container'>
            <div className='left-panel'>
                <ul className='tasks'>
                    <li className={t0 ? 'selected-task' : 'task'}> 
                        <button onClick={() => {disableAll(); setTask0(true)}}>{tasks_name[0]}</button>
                    </li>
                    <li className={t1 ? 'selected-task' : 'task'}> 
                        <button onClick={() => {disableAll(); setTask1(true)}}>{tasks_name[1]}</button>
                    </li>
                    <li className={t2 ? 'selected-task' : 'task'}>
                        <button onClick={() => {disableAll(); setTask2(true)}}>{tasks_name[2]}</button>
                    </li>
                    <li className={t3 ? 'selected-task' : 'task'}>
                        <button onClick={() => {disableAll(); setTask3(true)}}>{tasks_name[3]}</button>
                    </li>
                    <li className={t4 ? 'selected-task' : 'task'}>
                        <button onClick={() => {disableAll(); setTask4(true)}}>{tasks_name[4]}</button>
                    </li>
                    <li className={t5 ? 'selected-task' : 'task'}>
                        <button onClick={() => {disableAll(); setTask5(true)}}>{tasks_name[5]}</button>
                    </li>
                </ul>
            </div>

            <div className='question-panel'>
                {
                    t0 ? // Python Notebook
                    <div>
                        Python Notebook
                    </div>: null
                }
                {
                    t1 ? // Demo 1D
                    <div>
                        <form className='function-input'>
                            <label>f(x):</label>
                            <br/>
                            <input type="text" name='title' />
                            <label>alpha:</label>
                            <br/>
                            <input type="text" name='title' />
                        </form>
                        <br />
                        <div className='demo-graph-board'>

                        </div>
                        <br />
                        <div className='controls'>
                            <button>Demonstrate</button>
                            <button>STOP</button>
                        </div>
                    </div>: null
                }
                
                {
                    t2 ? // Step-By-Step 1D
                    <div>
                        <form className='function-input'>
                            <label>f(x):</label>
                            <br/>
                            <input type="text" name='title' />
                            <label>alpha:</label>
                            <br/>
                            <input type="text" name='title' />
                        </form>
                        <br />
                        <div className='solution-board'>
                            <table className='solution-table'>
                                <tr className='title'>
                                    <th>Step</th>
                                    <th>x</th>
                                    <th>dx</th>
                                    <th>alpha*dx</th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><input value="0" readonly/></td>
                                    <td><input /></td>
                                    <td><input /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><input /></td>
                                    <td><input /></td>
                                    <td><input /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><input /></td>
                                    <td><input /></td>
                                    <td><input /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><input /></td>
                                    <td><input /></td>
                                    <td><input /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><input /></td>
                                    <td><input /></td>
                                    <td><input /></td>
                                </tr>
                            </table>
                            <div className='solution-graph-board'>

                            </div>
                        </div>
                        <br />
                        <div className='controls'>
                            <button>&#8680;</button>
                            <button>&#8678;</button>
                            <button>Check</button>
                        </div>
                    </div>: null
                }
                
                {
                    t3 ? // Demo 2D
                    <div>
                        <form className='function-input'>
                            <label>f(x, y):</label>
                            <br/>
                            <input type="text" name='title' />
                            <label>alpha:</label>
                            <br/>
                            <input type="text" name='title' />
                            <label>beta:</label>
                            <br/>
                            <input type="text" name='title' />
                        </form>
                        <br />
                        <div className='demo-graph-board'>

                        </div>
                        <br />
                        <div className='controls'>
                            <button>Demonstrate</button>
                            <button>STOP</button>
                        </div>
                    </div>: null
                }

                {
                    t4 ? // Step-By-Step 2D
                    <div>
                        <form className='function-input'>
                            <label>f(x, y):</label>
                            <br/>
                            <input type="text" name='title' />
                            <label>alpha:</label>
                            <br/>
                            <input type="text" name='title' />
                            <label>beta:</label>
                            <br/>
                            <input type="text" name='title' />
                        </form>
                        <br />
                        <div className='solution-board'>
                        <table className='solution-table'>
                            <tr className='title'>
                                <th>Step</th>
                                <th>x</th>
                                <th>dx</th>
                                <th>y</th>
                                <th>dy</th>
                                <th>alpha*dx</th>
                                <th>beta*dy</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input value="0" readonly/></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                            </tr>
                        </table>
                            <div className='solution-graph-board'>

                            </div>
                        </div>
                        <br />
                        <div className='controls'>
                            <button>&#8680;</button>
                            <button>&#8678;</button>
                            <button>Check</button>
                        </div>
                    </div>: null
                }

                { 
                    t5 ? // Hyper Parameter
                    <div>
                        <label>Select Dimension</label>
                        <select className='hyper-parameter-selector'>
                            <option value={'1D'}>1D

                            </option>
                            <option value={'2D'}>2D
                                
                            </option>
                        </select>
                    </div>: null
                }
            </div>
        </div>
    );
}

export default Algorithms

