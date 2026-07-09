import React, { useState } from 'react';
import { 
  Book, Users, Search, Menu, X, GraduationCap, 
  ChevronDown, ChevronRight, Sparkles, FileText, 
  Bookmark, Send, Bot, User, BookOpen
} from 'lucide-react';

// Pre-generated data for the library
const libraryData = [
  { id: 1, name: "Abubakar Ibrahim", matric: "FUL/ECO/19/001", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "UG", year: "2023" },
  { id: 2, name: "Chinonso Eze", matric: "FUL/ECO/19/045", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "UG", year: "2023" },
  { id: 3, name: "Fatima Yusuf", matric: "FUL/ECO/20/112", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "UG", year: "2024" },
  { id: 4, name: "Emmanuel Oche", matric: "FUL/ECO/18/088", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "UG", year: "2022" },
  { id: 5, name: "Aisha Bello", matric: "PGD/ECO/21/005", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "PGD", year: "2022" },
  { id: 6, name: "Samuel Adebayo", matric: "MSC/ECO/19/077", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "MSC", year: "2021" },
  { id: 7, name: "Grace Danjuma", matric: "FUL/ECO/20/034", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "UG", year: "2024" },
  { id: 8, name: "Musa Abdullahi", matric: "PHD/ECO/18/102", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "PHD", year: "2023" },
  { id: 9, name: "Blessing Okoro", matric: "MSC/ECO/21/018", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "MSC", year: "2023" },
  { id: 10, name: "David Aliyu", matric: "FUL/ECO/19/056", department: "Economics", faculty: "Social Sciences", institution: "Federal University of Lafia", type: "UG", year: "2023" }
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("home"); // 'home', 'research', 'records'
  const [viewTitle, setViewTitle] = useState("Economics Department Archive");
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for expanded accordion menus
  const [expandedMenus, setExpandedMenus] = useState({
    ug: false,
    pg: false,
    pgLevels: { pgd: false, msc: false, phd: false }
  });

  // State for Gemini-like research chat
  const [researchQuery, setResearchQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Hello. I am the Economics Department Research Assistant. How can I help you find academic records, publications, or data today?' }
  ]);

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const togglePgLevel = (level) => {
    setExpandedMenus(prev => ({
      ...prev,
      pgLevels: { ...prev.pgLevels, [level]: !prev.pgLevels[level] }
    }));
  };

  const handleSelectRecord = (title) => {
    setActiveView("records");
    setViewTitle(title);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleResearchSubmit = (e) => {
    e.preventDefault();
    if (!researchQuery.trim()) return;
    
    setChatHistory([...chatHistory, { role: 'user', text: researchQuery }]);
    setResearchQuery("");
    
    // Mock AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'ai', 
        text: 'I am searching the department archives for that query. Currently, this is a simulated response, but I can eventually pull data from our thesis and publication databases.' 
      }]);
    }, 1000);
  };

  // Filter books based on search
  const filteredBooks = libraryData.filter(book => 
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.matric.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const years = ["2026", "2025", "2024", "2023", "2022", "2021"];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDE-TAB (Sidebar) - Blue Theme, Retractable */}
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-0'
        } fixed md:static inset-y-0 left-0 z-30 bg-blue-800 text-white transition-all duration-300 ease-in-out flex flex-col shadow-xl flex-shrink-0`}
      >
        <div className="p-5 flex items-center justify-between border-b border-blue-700 whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-blue-200 flex-shrink-0" />
            <span className="text-lg font-bold tracking-wide">Econs Archive</span>
          </div>
          <button className="md:hidden text-blue-200 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div className="px-3 space-y-1">
            
            {/* 1. Make a research */}
            <button 
              onClick={() => { setActiveView('research'); if(window.innerWidth < 768) setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors ${activeView === 'research' ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-700'}`}
            >
              <Sparkles className="h-5 w-5 text-blue-300" />
              Make a Research
            </button>

            {/* 2. Undergraduate Records */}
            <div>
              <button 
                onClick={() => toggleMenu('ug')}
                className="w-full flex items-center justify-between px-3 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-blue-300" />
                  <span className="font-medium">Undergraduate Records</span>
                </div>
                {expandedMenus.ug ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              
              {expandedMenus.ug && (
                <div className="pl-11 pr-3 py-1 space-y-1">
                  {years.map(year => (
                    <button 
                      key={`ug-${year}`}
                      onClick={() => handleSelectRecord(`Undergraduate Class of ${year}`)}
                      className="w-full text-left px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Class of {year}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Post Graduate */}
            <div>
              <button 
                onClick={() => toggleMenu('pg')}
                className="w-full flex items-center justify-between px-3 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Book className="h-5 w-5 text-blue-300" />
                  <span className="font-medium">Post Graduate</span>
                </div>
                {expandedMenus.pg ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              
              {expandedMenus.pg && (
                <div className="pl-8 pr-3 py-1 space-y-2">
                  {/* PGD */}
                  <div>
                    <button onClick={() => togglePgLevel('pgd')} className="w-full flex items-center justify-between px-3 py-2 text-sm text-blue-100 hover:bg-blue-700 rounded-md">
                      <span>PGD</span>
                      {expandedMenus.pgLevels.pgd ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </button>
                    {expandedMenus.pgLevels.pgd && (
                      <div className="pl-4 space-y-1 mt-1">
                        {years.map(year => (
                          <button key={`pgd-${year}`} onClick={() => handleSelectRecord(`PGD Records - ${year}`)} className="w-full text-left px-3 py-1.5 text-xs text-blue-300 hover:text-white hover:bg-blue-600 rounded">
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* MSc */}
                  <div>
                    <button onClick={() => togglePgLevel('msc')} className="w-full flex items-center justify-between px-3 py-2 text-sm text-blue-100 hover:bg-blue-700 rounded-md">
                      <span>MSc</span>
                      {expandedMenus.pgLevels.msc ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </button>
                    {expandedMenus.pgLevels.msc && (
                      <div className="pl-4 space-y-1 mt-1">
                        {years.map(year => (
                          <button key={`msc-${year}`} onClick={() => handleSelectRecord(`MSc Records - ${year}`)} className="w-full text-left px-3 py-1.5 text-xs text-blue-300 hover:text-white hover:bg-blue-600 rounded">
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* PhD */}
                  <div>
                    <button onClick={() => togglePgLevel('phd')} className="w-full flex items-center justify-between px-3 py-2 text-sm text-blue-100 hover:bg-blue-700 rounded-md">
                      <span>PhD</span>
                      {expandedMenus.pgLevels.phd ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </button>
                    {expandedMenus.pgLevels.phd && (
                      <div className="pl-4 space-y-1 mt-1">
                        {years.map(year => (
                          <button key={`phd-${year}`} onClick={() => handleSelectRecord(`PhD Records - ${year}`)} className="w-full text-left px-3 py-1.5 text-xs text-blue-300 hover:text-white hover:bg-blue-600 rounded">
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Department Publications */}
            <button onClick={() => handleSelectRecord("Department Publications")} className="w-full flex items-center gap-3 px-3 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors">
              <FileText className="h-5 w-5 text-blue-300" />
              <span className="font-medium text-left">Department Publications</span>
            </button>

            {/* 5. Authors / Students */}
            <button onClick={() => handleSelectRecord("Authors & Students Directory")} className="w-full flex items-center gap-3 px-3 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors">
              <Users className="h-5 w-5 text-blue-300" />
              <span className="font-medium text-left">Authors / Students</span>
            </button>

            {/* 6. Essential Resources */}
            <button onClick={() => handleSelectRecord("Essential Resources")} className="w-full flex items-center gap-3 px-3 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors">
              <Bookmark className="h-5 w-5 text-blue-300" />
              <span className="font-medium text-left">Essential Resources</span>
            </button>

          </div>
        </nav>
      </aside>

      {/* MAIN DISPLAY - White/Off-white Theme */}
      <main className="flex-1 flex flex-col h-full w-full overflow-hidden bg-white">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button 
              className="p-2 rounded-md hover:bg-slate-100 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 truncate max-w-[200px] sm:max-w-md">
              {activeView === 'research' ? 'AI Research Assistant' : viewTitle}
            </h1>
          </div>

          {activeView !== 'research' && (
            <div className="relative hidden sm:block w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search archives..."
                className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </header>

        {/* Content Area */}
        {activeView === 'research' ? (
          /* AI Research View (Gemini Style) */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 pb-32">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex gap-4 max-w-4xl mx-auto ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 border border-blue-200">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                  <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box Area */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-12">
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleResearchSubmit} className="relative flex items-center">
                  <textarea
                    rows="1"
                    placeholder="Ask about economics papers, thesis records, or department data..."
                    className="w-full bg-white border border-slate-300 rounded-3xl pl-6 pr-16 py-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
                    value={researchQuery}
                    onChange={(e) => setResearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleResearchSubmit(e);
                      }
                    }}
                  />
                  <button 
                    type="submit"
                    disabled={!researchQuery.trim()}
                    className="absolute right-3 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                  >
                    <Send className="h-5 w-5 ml-0.5" />
                  </button>
                </form>
                <p className="text-center text-xs text-slate-400 mt-3">
                  AI assistant may occasionally hallucinate. Verify critical records with department admins.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Records View (Grid) */
          <div className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="mb-6 flex justify-between items-end">
              <p className="text-slate-600">
                Displaying archives for <span className="font-semibold text-slate-800">{viewTitle}</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div 
                  key={book.id} 
                  className="bg-slate-900 border-t-4 border-blue-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full relative overflow-hidden group"
                >
                  <div className="absolute -right-4 -top-4 text-slate-800 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                    <Book className="h-32 w-32" />
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="mb-4 pb-4 border-b border-slate-700">
                      <h2 className="text-xl font-bold text-white mb-1 leading-tight">{book.name}</h2>
                      <div className="flex items-center justify-between mt-2">
                         <p className="text-blue-300 font-mono text-sm bg-blue-900/50 px-2 py-0.5 rounded">{book.matric}</p>
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{book.type} '{book.year.slice(-2)}</span>
                      </div>
                    </div>

                    <div className="space-y-3 flex-1 text-sm text-slate-300">
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-slate-500 mb-0.5">Department</span>
                        <span className="font-medium text-slate-100">{book.department}</span>
                      </div>
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-slate-500 mb-0.5">Faculty</span>
                        <span className="font-medium text-slate-100">{book.faculty}</span>
                      </div>
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-slate-500 mb-0.5">Institution</span>
                        <span className="font-medium text-slate-100">{book.institution}</span>
                      </div>
                    </div>
                    
                    <button className="mt-6 w-full py-2.5 px-4 bg-slate-800 hover:bg-blue-600 text-white text-sm font-medium rounded-lg border border-slate-700 hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400">
                      View Thesis / Record
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredBooks.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                  <h3 className="text-lg font-medium text-slate-700 mb-1">No Records Found</h3>
                  <p>Try adjusting your search terms or selecting a different category.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}} />
    </div>
  );
}