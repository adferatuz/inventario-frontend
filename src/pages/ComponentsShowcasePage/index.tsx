import React, { useState } from 'react';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import Table from '@/shared/ui/Table';
import Spinner from '@/shared/ui/Spinner';
import styles from './ComponentsShowcasePage.module.css';

// Asumiendo que FontAwesome está disponible globalmente o se importará en el futuro
// import '@fortawesome/fontawesome-free/css/all.min.css';

const ComponentsShowcasePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Cargando...');

  const tableHeaders = ['ID', 'Nombre', 'Descripción', 'Acciones'];
  const tableData = [
    { id: 1, name: 'Producto A', description: 'Descripción del Producto A' },
    { id: 2, name: 'Producto B', description: 'Descripción del Producto B' },
  ];

  return (
    <div className={styles.container}>
      <h1>Demostración de Componentes UI Genéricos</h1>

      <section className={styles.section}>
        <h2>Botones</h2>
        <div className={styles.componentGroup}>
          <Button variant="primary" onClick={() => alert('Botón Primario')}>
            Botón Primario
          </Button>
          <Button variant="danger" onClick={() => alert('Botón Peligro')}>
            Botón Peligro
          </Button>
          <Button variant="success" onClick={() => alert('Botón Éxito')}>
            Botón Éxito
          </Button>
          <Button variant="secondary" onClick={() => alert('Botón Secundario')}>
            Botón Secundario
          </Button>
          <Button variant="action" onClick={() => alert('Botón Acción')}>
            <i className="fas fa-plus"></i> Acción
          </Button>
          <Button variant="action" className={styles.edit} onClick={() => alert('Editar')}>
            <i className="fas fa-edit"></i>
          </Button>
          <Button variant="action" className={styles.delete} onClick={() => alert('Eliminar')}>
            <i className="fas fa-trash"></i>
          </Button>
          <Button disabled>Botón Deshabilitado</Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Inputs</h2>
        <div className={styles.componentGroup}>
          <Input
            label="Nombre de Usuario"
            placeholder="Ingresa tu nombre"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Ingresa tu contraseña"
            icon={<i className="fas fa-lock"></i>}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Ingresa tu email"
            icon={<i className="fas fa-envelope"></i>}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Modal</h2>
        <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Título del Modal">
          <p>Este es el contenido del modal.</p>
          <p>Puedes poner cualquier cosa aquí.</p>
          <Button onClick={() => setIsModalOpen(false)}>Cerrar</Button>
        </Modal>
      </section>

      <section className={styles.section}>
        <h2>Tabla</h2>
        <Table headers={tableHeaders}>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.description}</td>
              <td>
                <Button variant="action" className={styles.edit} onClick={() => alert(`Editar ${row.name}`)}>
                  <i className="fas fa-edit"></i>
                </Button>
                <Button variant="action" className={styles.delete} onClick={() => alert(`Eliminar ${row.name}`)}>
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </section>

      <section className={styles.section}>
        <h2>Spinner</h2>
        <Button onClick={() => setLoadingMessage('Cargando datos...')}>Mostrar Spinner</Button>
        <Button onClick={() => setLoadingMessage('Procesando...')}>Mostrar Spinner con Mensaje</Button>
        {/* Para ver el spinner, puedes envolverlo en un estado condicional */}
        {/* Por ejemplo, si tuvieras un estado `isLoading` */}
        {/* {isLoading && <Spinner message={loadingMessage} />} */}
        <Spinner message={loadingMessage} /> {/* Renderizado directamente para demostración */}
      </section>
    </div>
  );
};

export default ComponentsShowcasePage;
