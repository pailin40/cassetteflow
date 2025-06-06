// don't have theme context
import React from 'react';
import AppLayout from './components/Layout/AppLayout';
import { PlayerProvider } from './context/PlayerContext';
import { LibraryProvider } from './context/LibraryContext';

function App() {
  return (
    <PlayerProvider>
      <LibraryProvider>
        <AppLayout />
      </LibraryProvider>
    </PlayerProvider>
  );
}

export default App;



// //when have theme context
// import React from 'react';
// import AppLayout from './components/Layout/AppLayout';
// import { PlayerProvider } from './context/PlayerContext';
// import { LibraryProvider } from './context/LibraryContext';
// import { ThemeProvider } from './context/ThemeContext';

// function App() {
//   return (
//     <ThemeProvider>
//       <PlayerProvider>
//         <LibraryProvider>
//           <AppLayout />
//         </LibraryProvider>
//       </PlayerProvider>
//     </ThemeProvider>
//   );
// }

// export default App;