import React from 'react';
import ComponentsShowcasePage from '@/pages/ComponentsShowcasePage'; // Importar la página de demostración
import '@/app/App.css'; // Mantener la importación de estilos de App.css

function App() {
  return (
    <div className="App">
      <ComponentsShowcasePage /> {/* Renderizar la página de demostración */}
    </div>
  );
}

export default App;
