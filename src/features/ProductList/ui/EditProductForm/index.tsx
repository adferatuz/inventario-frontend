import React, { useState } from 'react';
import type { Product } from '@/entities/Product/model/types';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import styles from './EditProductForm.module.css';

interface EditProductFormProps {
  product: Product;
  onSave: (data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onSave, onCancel, loading }) => {
  const [form, setForm] = useState({
    name: product.name || '',
    sku: product.sku || '',
    description: product.description || '',
    price: product.price,
    stockQuantity: product.stockQuantity,
    minimumStock: product.minimumStock,
    category: product.category || '',
    brand: product.brand || '',
    status: product.status,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' || name === 'stockQuantity' || name === 'minimumStock' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.sku.trim()) {
      setError('El nombre y el SKU son obligatorios.');
      return;
    }
    setError(null);
    onSave(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input label="Nombre" name="name" value={form.name} onChange={handleChange} required />
      <Input label="SKU" name="sku" value={form.sku} onChange={handleChange} required />
      <Input label="Descripción" name="description" value={form.description} onChange={handleChange} />
      <Input label="Precio" name="price" type="number" value={form.price} onChange={handleChange} required min={0} step={0.01} />
      <Input label="Stock" name="stockQuantity" type="number" value={form.stockQuantity} onChange={handleChange} required min={0} />
      <Input label="Stock Mínimo" name="minimumStock" type="number" value={form.minimumStock} onChange={handleChange} required min={0} />
      <Input label="Categoría" name="category" value={form.category} onChange={handleChange} />
      <Input label="Marca" name="brand" value={form.brand} onChange={handleChange} />
      <label className={styles.label}>
        Estado
        <select name="status" value={form.status} onChange={handleChange} className={styles.select} required>
          <option value="ACTIVE">Activo</option>
          <option value="INACTIVE">Inactivo</option>
          <option value="DISCONTINUED">Descontinuado</option>
        </select>
      </label>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.actions}>
        <Button type="submit" variant="primary" disabled={loading}>Guardar</Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>Cancelar</Button>
      </div>
    </form>
  );
};

export default EditProductForm;
