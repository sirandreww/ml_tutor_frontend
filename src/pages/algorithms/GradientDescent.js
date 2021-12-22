import React from 'react';
import { Slider } from "@mui/material";
import NI from 'assets/images/notebook.png';
import GD1D from 'assets/images/GD1D.png';
import GD1DS from 'assets/images/GD1DS.png';
import GD2D from 'assets/images/GD2D.png';
import GD2DS from 'assets/images/GD2DS.png';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


const tasks_name = [
    'Note Book', 
    'Demo 1D', 
    'Step-By-Step 1D', 
    'Demo 2D', 
    'Step-By-Step 2D', 
    'HyperParameter 1D', 
    'HyperParameter 2D'
]

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function GradientDescent() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
            backgroundColor: '#E4EFE7',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            minHeight: '100%',
            }}
        >
            <Box
                sx={{ 
                    flexGrow: 1, 
                    bgcolor: 'background.paper', 
                    display: 'flex'
                }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ 
                        borderRight: 1, 
                        borderColor: 'divider',
                    }}
                >
                    <Tab label={tasks_name[0]} {...a11yProps(0)} />
                    <Tab label={tasks_name[1]} {...a11yProps(1)} />
                    <Tab label={tasks_name[2]} {...a11yProps(2)} />
                    <Tab label={tasks_name[3]} {...a11yProps(3)} />
                    <Tab label={tasks_name[4]} {...a11yProps(4)} />
                    <Tab label={tasks_name[5]} {...a11yProps(5)} />
                    <Tab label={tasks_name[6]} {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {/* NoteBook */}
                    <div>
                        <img src={NI} alt='' />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* Demo 1D */}
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
                            <img src={GD1D} alt='' width="50%"/>
                        </div>
                        <br />
                        <div className='controls'>
                            <button>Demonstrate</button>
                            <button>STOP</button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {/* Step By Step 1D */}
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
                                <img src={GD1DS} alt='' width="50%"/>
                            </div>
                        </div>
                        <br />
                        <div className='controls'>
                            <button>&#8680;</button>
                            <button>&#8678;</button>
                            <button>Check</button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {/* Demo 2D */}
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
                            <img src={GD2D} alt='' width="50%"/>
                        </div>
                        <br />
                        <div className='controls'>
                            <button>Demonstrate</button>
                            <button>STOP</button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    {/* Step By Step 2D */}
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
                                <img src={GD2DS} alt='' width="50%"/>
                            </div>
                        </div>
                        <br />
                        <div className='controls'>
                            <button>&#8680;</button>
                            <button>&#8678;</button>
                            <button>Check</button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    {/* Hyepr Parameter 1D */}
                    <div>
                        <form className='function-input'>
                            <label>f(x):</label>
                            <br/>
                            <input type="text" name='title' />
                            <div className='controls'>
                                <label>alpha:</label>
                                <Slider 
                                    className='slider'
                                    defaultValue={1} 
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={20}
                                    step={0.1}
                                />
                            </div>
                        </form>
                        <br />
                        <div className='solution-board'>
                            <div className='solution-graph-board'>

                            </div>
                            <div className='results'>
                                <span>(x'):  </span>
                                <input readOnly value=""></input>
                            </div>
                            <div className='results'>
                                <span>f(x'):  </span>
                                <input readOnly value="" ></input>
                            </div>
                        </div>
                        <br />
                        <div className='controls'>
                            <button>&#8680;</button>
                            <button>&#8678;</button>
                            <button>Check</button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    {/* Hyepr Parameter 2D */}
                    <div>
                        <form className='function-input'>
                            <label>f(x, y):</label>
                            <br/>
                            <input type="text" name='title' />
                            <div className='controls'>
                                <label>alpha:</label>
                                <Slider 
                                    className='slider'
                                    defaultValue={1} 
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={20}
                                    step={0.1}
                                />
                            </div>
                            <div className='controls'>
                                <label>beta:</label>
                                <Slider 
                                    className='slider'
                                    defaultValue={1} 
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={20}
                                    step={0.1}
                                />
                            </div>
                        </form>
                        <br />
                        <div className='solution-board'>
                            <div className='solution-graph-board'>

                            </div>
                            <div className='results'>
                                <span>(x', y'):  </span>
                                <input readOnly value=""></input>
                            </div>
                            <div className='results'>
                                <span>f(x', y'):  </span>
                                <input readOnly value="" ></input>
                            </div>
                        </div>
                        <br />
                        <div className='controls'>
                            <button>&#8680;</button>
                            <button>&#8678;</button>
                            <button>Check</button>
                        </div>
                    </div>
                </TabPanel>
            </Box>
        </Box>
    );
}


// function Algorithms() {
//     return (
//         <div className='algorithms-container'>
            
//             <div className='question-panel'>
//                 {
//                     t0 ? // Python Notebook
//                     <div>
//                         <img src={NI} alt=''/>
//                     </div>: null
//                 }
//                 {
//                     t1 ? // Demo 1D
//                     <div>
//                         <form className='function-input'>
//                             <label>f(x):</label>
//                             <br/>
//                             <input type="text" name='title' />
//                             <label>alpha:</label>
//                             <br/>
//                             <input type="text" name='title' />
//                         </form>
//                         <br />
//                         <div className='demo-graph-board'>
//                             <img src={GD1D} alt='' width="50%"/>
//                         </div>
//                         <br />
//                         <div className='controls'>
//                             <button>Demonstrate</button>
//                             <button>STOP</button>
//                         </div>
//                     </div>: null
//                 }
                
//                 {
//                     t2 ? // Step-By-Step 1D
//                     <div>
//                         <form className='function-input'>
//                             <label>f(x):</label>
//                             <br/>
//                             <input type="text" name='title' />
//                             <label>alpha:</label>
//                             <br/>
//                             <input type="text" name='title' />
//                         </form>
//                         <br />
//                         <div className='solution-board'>
//                             <table className='solution-table'>
//                                 <tr className='title'>
//                                     <th>Step</th>
//                                     <th>x</th>
//                                     <th>dx</th>
//                                     <th>alpha*dx</th>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input value="0" readonly/></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                             </table>
//                             <div className='solution-graph-board'>
//                                 <img src={GD1DS} alt='' width="50%"/>
//                             </div>
//                         </div>
//                         <br />
//                         <div className='controls'>
//                             <button>&#8680;</button>
//                             <button>&#8678;</button>
//                             <button>Check</button>
//                         </div>
//                     </div>: null
//                 }
                
//                 {
//                     t3 ? // Demo 2D
//                     <div>
//                         <form className='function-input'>
//                             <label>f(x, y):</label>
//                             <br/>
//                             <input type="text" name='title' />
//                             <label>alpha:</label>
//                             <br/>
//                             <input type="text" name='title' />
//                             <label>beta:</label>
//                             <br/>
//                             <input type="text" name='title' />
//                         </form>
//                         <br />
//                         <div className='demo-graph-board'>
//                             <img src={GD2D} alt='' width="50%"/>
//                         </div>
//                         <br />
//                         <div className='controls'>
//                             <button>Demonstrate</button>
//                             <button>STOP</button>
//                         </div>
//                     </div>: null
//                 }

//                 {
//                     t4 ? // Step-By-Step 2D
//                     <div>
//                         <form className='function-input'>
//                             <label>f(x, y):</label>
//                             <br/>
//                             <input type="text" name='title' />
//                             <label>alpha:</label>
//                             <br/>
//                             <input type="text" name='title' />
//                             <label>beta:</label>
//                             <br/>
//                             <input type="text" name='title' />
//                         </form>
//                         <br />
//                         <div className='solution-board'>
//                             <table className='solution-table'>
//                                 <tr className='title'>
//                                     <th>Step</th>
//                                     <th>x</th>
//                                     <th>dx</th>
//                                     <th>y</th>
//                                     <th>dy</th>
//                                     <th>alpha*dx</th>
//                                     <th>beta*dy</th>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input value="0" readonly/></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                                 <tr>
//                                     <td></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                     <td><input /></td>
//                                 </tr>
//                             </table>
//                             <div className='solution-graph-board'>
//                                 <img src={GD2DS} alt='' width="50%"/>
//                             </div>
//                         </div>
//                         <br />
//                         <div className='controls'>
//                             <button>&#8680;</button>
//                             <button>&#8678;</button>
//                             <button>Check</button>
//                         </div>
//                     </div>: null
//                 }

//                 { 
//                     t5 ? // Hyper Parameter 1D
//                     c: null
//                 }

//                 { 
//                     t6 ? // Hyper Parameter 1D
//                     <div>
//                         <form className='function-input'>
//                             <label>f(x, y):</label>
//                             <br/>
//                             <input type="text" name='title' />
//                             <div className='controls'>
//                                 <label>alpha:</label>
//                                 <Slider 
//                                     className='slider'
//                                     defaultValue={1} 
//                                     valueLabelDisplay="auto"
//                                     min={0}
//                                     max={20}
//                                     step={0.1}
//                                 />
//                             </div>
//                             <div className='controls'>
//                                 <label>beta:</label>
//                                 <Slider 
//                                     className='slider'
//                                     defaultValue={1} 
//                                     valueLabelDisplay="auto"
//                                     min={0}
//                                     max={20}
//                                     step={0.1}
//                                 />
//                             </div>
//                         </form>
//                         <br />
//                         <div className='solution-board'>
//                             <div className='solution-graph-board'>

//                             </div>
//                             <div className='results'>
//                                 <span>(x', y'):  </span>
//                                 <input readOnly value=""></input>
//                             </div>
//                             <div className='results'>
//                                 <span>f(x', y'):  </span>
//                                 <input readOnly value="" ></input>
//                             </div>
//                         </div>
//                         <br />
//                         <div className='controls'>
//                             <button>&#8680;</button>
//                             <button>&#8678;</button>
//                             <button>Check</button>
//                         </div>
//                     </div>: null
//                 }
//             </div>
//         </div>
//     );
//     }

// }

