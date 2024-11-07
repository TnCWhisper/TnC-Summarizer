 export default async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    setCurrentTab(tab);
    if (tab) {
        setTabUrl(tab.url);
    }
}
