import { ColorModeContext, useMode } from "./theme";
import { AppBar, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Appbar from "./scenes/global/PrimarySearchAppBar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import {Routes, Route} from "react-router-dom";
import Home from "./scenes/home";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Contacts2 from "./scenes/contacts2";
import Contacts3 from "./scenes/contacts3";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import APILibrary from "./scenes/apilibrary";
import CustPortal from "./scenes/custportal";
import PlatformDash from "./scenes/custportal/platformdash";
import ServiceDash from "./scenes/custportal/servicedash";
import Heatmap from "./scenes/heatmap";
import Placeholder from "./scenes/placeholder";
import UnixDash from "./scenes/custportal/unix";
import React, {useState, useEffect} from 'react'
import api from "./api";

//test comment to check github connection from vscode...

function App() {

  const [theme, colorMode] = useMode();
  const [transactions, setTransactions] = useState([]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Appbar />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/home" element={<Home />}/>   
              <Route path="/dashboard" element={<Dashboard />}/>              
              <Route path="/placeholder" element={<Placeholder />}/> 
              <Route path="/team" element={<Team />}/>
              <Route path="/contacts" element={<Contacts />}/>
              <Route path="/contacts2" element={<Contacts2 />}/>
              <Route path="/contacts3" element={<Contacts3 />}/>
              <Route path="/invoices" element={<Invoices />}/>
              <Route path="/form" element={<Form />}/>
              <Route path="/bar" element={<Bar />}/>
              <Route path="/pie" element={<Pie />}/>
              <Route path="/line" element={<Line />}/>
              <Route path="/faq" element={<FAQ />}/>
              <Route path="/geography" element={<Geography />}/>
              <Route path="/calendar" element={<Calendar />}/>
              <Route path="/apilibrary" element={<APILibrary />}/>
              <Route path="/custportal" element={<CustPortal />}/>
              <Route path="/servicedash" element={<ServiceDash />} />
              <Route path="/platformdash" element={<PlatformDash />} />
              <Route path="/unix" element={<UnixDash />} />
              <Route path="/heatmap" element={<Heatmap />}/>
              </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
