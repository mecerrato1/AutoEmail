import React, { useState } from 'react';

function App() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      alert('Please upload a valid CSV file');
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message || !csvFile) {
      alert('Please fill in all fields and upload a CSV file');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement email sending logic here
      console.log('Sending emails...');
      console.log({ subject, message, csvFile });
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error sending emails. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Bulk Email Sender</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
              placeholder="Enter email subject"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="6"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 transition-colors resize-none"
              placeholder="Enter your message here..."
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Recipients
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                Upload a CSV file containing email addresses
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md text-white font-semibold transition-all ${
              isLoading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 active:transform active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : 'Send Emails'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
