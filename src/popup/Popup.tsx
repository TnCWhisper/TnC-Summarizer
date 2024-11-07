import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import "../styles/tailwind.css"



const Popup = () => {
    const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | undefined>()
    const [tabUrl, setTabUrl] = useState<string | undefined>('');
    
    const handleClick = () => {
        alert('Button!')
    };
async function getCurrentTab() {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        console.log(tab);
        setCurrentTab(tab);
        if (tab) {
            setTabUrl(tab.url);
        }
    }
    
    

    const preProcess = async () => {
        if (!tabUrl) return;
        const processUrl = tabUrl.replace("https://", "").replace('http://', '');
        const data2 = {
            company_name: "ABC",
            document: processUrl,  // Adjusted to use processed URL
            flagged_sections: []
        };

        try {
            // Convert data2 to a JSON string
            const response = await fetch('https://b682-103-66-227-224.ngrok-free.app/api/terms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data2),  // Fix: JSON.stringify the data before sending
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Message", data);
        } catch (error) {
            console.error("OOPS", error);
        }
    }

    return (
        <div className='flex flex-col items-center w-[400px] h-[650px]   bg-gray-1 p-4'>
            <div className='flex p-2 items-center font-bold'>
                <h1 className='text-xl flex gap-2 cursor-pointer font-bold text-white hover:underline transition duration-30 ease-in-out'>
                    Your TnC Summarizer
                </h1>
                <img src="/ai-icon.png" alt="omg?" />
            </div>

            <button className='bg-black text-white font-bold py-2 px-4 rounded-lg animate-pulse p-4 hover:bg-white hover:text-gray-2 ' onClick={handleClick}>
                Click Me
            </button>
            <button onClick={getCurrentTab}>
                Get Tab
            </button>
            {tabUrl && (
                <p className=' text-yellow-400'>{tabUrl}</p>
            )}
            <button onClick={preProcess}>
                Send URL
            </button>
        </div>
    )
}

export default Popup;

const container = document.getElementById('root')
const root = createRoot(container as HTMLDivElement)
root.render(<Popup />)