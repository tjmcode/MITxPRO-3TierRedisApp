// #region  H E A D E R
// <copyright file="index.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    JS for the 'Holy Grail' 3-Tier App
 *      Module:   CLIENT Entry JS (MicroCODE:index.JS)
 *      Project:  MITxPRO-WEEK25
 *      Customer: MIT
 *      Creator:  MicroCODE Incorporated
 *      Date:     August 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the entry level JS for the CLIENT side of the 'Holy Grail' 3-Tier App.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Style Guide
 *         https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1
 *
 *      2. AirBnB JavaScript Style Guide
 *         https://github.com/airbnb/javascript
 *
 *      3. Turing School Style Guide
 *         https://github.com/turingschool-examples/javascript/tree/main/es5
 *
 *      4. MDN Web Docs - JavaScript Classes
 *         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
 *
 *      5. JSDoc - How to properly document JavaScript Code.
 *         https://
 *
 *      6. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  16-Aug-2022   TJM-MCODE  {0001}    New module for the 'Holy Grail' 3-Tier App.
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

/**
 * App() – the 'Single Page App (SPA)'.
 *
 * @api public
 *
 * @param {nil} none no parameters.
 * @returns React Component representing the entire SPA.
 *
 * @example
 *
 *      App();
 *
 */
function App()
{
    const [data, setData] = React.useState({header: 1, footer: 2, left: 3, right: 4, article: 5});

    React.useEffect(() =>
    {
        // read db data & update UI
        const response = _read()
            .then(res =>
            {
                setData(res);
            });
    }, []);

    function handle(section)
    {
        // update db & local state
        const response = _update(section.name, data[section.name] + section.value)
            .then(res =>
            {
                setData(res);
            });
    }

    return (<>
        <div className="grid">
            <Header handle={handle} data={data} />
            <Left handle={handle} data={data} />
            <Article handle={handle} data={data} />
            <Right handle={handle} data={data} />
            <Footer handle={handle} data={data} />
        </div>
    </>);
}

/**
 * Data() – formats the App's props data for display.
 *
 * @api public
 *
 * @param {props} props app properties.
 * @returns HTML representing the state of all App data.
 *
 * @example
 *
 *      Data(props);
 *
 */
function AppData(props)
{
    // NOTE: The order of these parameters must match the code in index.js 'data()' function
    //       And 'App()' useState initialization.
    return (<div>
        Header:  {props.data.header},
        Footer:  {props.data.footer},
        Left:    {props.data.left},
        Right:   {props.data.right},
        Article: {props.data.article}
    </div>);
}

/**
 * PlusMinus() – updates the section value in the remote database based on +/- controls.
 *
 * @api public
 *
 * @param {props} props app properties.
 * @param {object} value teh section data value.
 */
function PlusMinus(props)
{
    function handle(e)
    {
        let increment = (e.target.id.includes('minus')) ? -1 : +1;
        props.handle({name: props.section, value: increment});
    }
    return (<>
        <img src={`icons/${props.section}_plus.png`} id="plus" onClick={((e) => handle(e))} />
        <img src={`icons/${props.section}_minus.png`} id="minus" onClick={((e) => handle(e))} />
    </>);
}
// #endregion

// #region  M E T H O D S – P R I V A T E

/**
 * _read() – reads all section data from the remote database.
 *
 * @api private
 *
 */
function _read()
{
    return new Promise((resolve, reject) =>
    {
        var url = '/data';
        superagent
            .get(url)
            .end(function (err, res)
            {
                err ? reject(null) : resolve(res.body);
            });
    });
}

/**
 * _update() – updates the section value in the remote database.
 *
 * @api private
 *
 * @param {object} section the section data name.
 * @param {object} value teh section data value.
 */
function _update(section, value)
{
    return new Promise((resolve, reject) =>
    {
        var url = `/update/${section}/${value}`;
        superagent
            .get(url)
            .end(function (err, res)
            {
                err ? reject(null) : resolve(res.body);
            });
    });
}

// #endregion

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// #region  M E T H O D - E X P O R T S

// #endregion

// #endregion
// #endregion