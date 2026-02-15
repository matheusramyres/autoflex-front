import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';

import type { Materials } from '../../types/ProductType';

import clsx from 'clsx';
import {
  ChevronDown,
  ChevronRight,
  Edit2,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import type { Product } from '../../types/ProductType';
import { columns } from './columns';
import { ModalAddMaterial } from './components/ModalAddMaterial';

import {
  addMaterialToProduct,
  createProduct,
  deleteProduct,
  removeMaterialFromProduct,
  updateProduct,
} from '../../app/productsSlice';
import { SkeletonRow } from '../../skeleton/SkeletonRow/SkeletonRow';
import { PaginationController } from '../PaginationController/PaginationController';

type ProductTableProps = {
  data: Product[];
  loading: boolean;
};

export const ProductTable = ({ data, loading }: ProductTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [idProduct, setIdProduct] = useState<number>(0);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [openModal, setOpenModal] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<
    string | number | null
  >(null);
  const [editingProduct, setEditingProduct] = useState<string | number | null>(
    null,
  );
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const [addForm, setAddForm] = useState<Partial<Product>>({
    name: '',
    price: 0,
    materials: [],
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const toggleExpand = (productId: number) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product.id);
    setEditForm({ ...product });
  };

  const handleDeleteProduct = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (editingProduct && editForm.name && editForm.price) {
      dispatch(
        updateProduct({
          id: Number(editingProduct),
          payload: {
            name: editForm.name,
            price: Number(editForm.price),
          },
        }),
      );

      setEditingProduct(null);
      setEditForm({});
    }
  };

  const addProduct = () => {
    if (addForm.name && addForm.price) {
      dispatch(
        createProduct({
          name: addForm.name,
          price: addForm.price,
        }),
      );
      setIsAdding(false);
      setAddForm({ name: '', price: 0, materials: [] });
    }
  };

  const handleAddMaterial = (productId: number, material: Materials) => {
    dispatch(
      addMaterialToProduct({
        productId,
        rawMaterial: material.rawMaterialId,
        requiredQuantity: material.requiredQty,
      }),
    );
  };

  const modalAddMaterialToProduct = (productId: number) => {
    setIdProduct(productId);
    setOpenModal(true);
  };

  const handleRemoveMaterial = (productRawMaterialId: number) => {
    dispatch(removeMaterialFromProduct(productRawMaterialId));
  };

  return (
    <>
      <ModalAddMaterial
        openModal={openModal}
        idProduct={idProduct}
        addMaterialToProduct={handleAddMaterial}
        setOpenModal={setOpenModal}
      />
      <div
        className={clsx(
          'flex flex-col md:flex-row',
          'items-end md:items-center',
          'justify-between',
        )}
      >
        <header className="w-full flex flex-col mb-6">
          <h1 className="text-white text-[28px] font-bold">Produtos</h1>
          <p className="text-erp-muted text-sm font-normal">
            Gerencie seu catálogo de produtos e composições.
          </p>
        </header>
        <button
          onClick={() => setIsAdding(true)}
          className={clsx(
            'min-w-40 flex items-center gap-2',
            'px-4 py-2 bg-blue-600 text-white',
            'rounded-lg hover:bg-blue-700 transition-colors',
          )}
        >
          <Plus size={20} />
          Add Produto
        </button>
      </div>
      {isAdding && (
        <div className="bg-gray-800 rounded-lg p-6 border border-blue-600 mt-6 md:mt-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Novo Produto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Nome</label>
              <input
                type="text"
                value={addForm.name}
                onChange={(e) =>
                  setAddForm({ ...addForm, name: e.target.value })
                }
                className={clsx(
                  'w-full px-4 py-2 bg-gray-900 border border-gray-700',
                  'rounded-lg text-white focus:border-blue-600 focus:outline-none',
                )}
                placeholder="Insira o nome do produto"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Preço (R$)
              </label>
              <input
                type="number"
                value={addForm.price}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    price: parseFloat(e.target.value),
                  })
                }
                className={clsx(
                  'w-full px-4 py-2 bg-gray-900 border border-gray-700',
                  'rounded-lg text-white focus:border-blue-600 focus:outline-none',
                )}
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addProduct}
              className={clsx(
                'px-4 py-2 bg-blue-600 text-white rounded-lg',
                'hover:bg-blue-700 transition-colors',
              )}
            >
              Salvar
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setAddForm({ name: '', price: 0, materials: [] });
              }}
              className={clsx(
                'px-4 py-2 bg-gray-700 text-white rounded-lg',
                'hover:bg-gray-600 transition-colors',
              )}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <div className="w-full mt-6 bg-erp-hover rounded-[10px] overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-erp-main">
                <th
                  className={clsx(
                    'bg-erp-main p-4 cursor-pointer',
                    'text-erp-muted text-sm text-left font-normal',
                  )}
                ></th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      'bg-erp-main p-4 cursor-pointer',
                      'text-erp-muted text-sm text-left font-normal',
                      header.id === 'actions' ? 'flex justify-end' : '',
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </>
            ) : (
              table.getRowModel().rows.map((row) => (
                <>
                  <tr key={row.id}>
                    <td className="p-2 border-t border-erp-subtle">
                      <button
                        onClick={() => toggleExpand(row.original.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {expandedProduct === row.original.id ? (
                          <ChevronDown size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )}
                      </button>
                    </td>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={clsx(
                          'border-t border-erp-subtle',
                          'p-4 text-sm font-semibold',
                        )}
                      >
                        {editingProduct === row.original.id &&
                        (cell.id.includes('name') ||
                          cell.id.includes('price')) ? (
                          <input
                            type="text"
                            value={
                              cell.id.includes('name')
                                ? editForm.name
                                : editForm.price
                            }
                            onChange={(e) => {
                              const label = cell.id.includes('name')
                                ? 'name'
                                : 'price';
                              setEditForm({
                                ...editForm,
                                [label]: e.target.value,
                              });
                            }}
                            className={clsx(
                              'w-full px-3 py-1 bg-gray-900 border border-gray-700',
                              'rounded text-white focus:border-blue-600 focus:outline-none',
                            )}
                          />
                        ) : (
                          <p
                            className={clsx(
                              cell.id.includes('rawMaterialQuantity') &&
                                'flex justify-center items-center p-2 w-8 h-6.75 rounded-2xl text-[#3EA2FF] bg-erp-brand-hover',
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </p>
                        )}

                        {cell.id.includes('actions') && (
                          <div className="flex items-center justify-end gap-2">
                            {editingProduct === row.original.id ? (
                              <>
                                <button
                                  onClick={saveEdit}
                                  className={clsx(
                                    'p-2 text-green-400 hover:bg-gray-700',
                                    'rounded transition-colors',
                                  )}
                                  title="Save"
                                >
                                  <Save size={18} />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className={clsx(
                                    'p-2 text-gray-400 hover:bg-gray-700',
                                    'rounded transition-colors',
                                  )}
                                  title="Cancel"
                                >
                                  <X size={18} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => startEdit(row.original)}
                                  className={clsx(
                                    'p-2 text-blue-400 hover:bg-gray-700',
                                    'rounded transition-colors',
                                  )}
                                  title="Edit"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteProduct(row.original.id)
                                  }
                                  className={clsx(
                                    'p-2 text-red-400 hover:bg-gray-700',
                                    'rounded transition-colors',
                                  )}
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      {expandedProduct === row.original.id && (
                        <div className="space-y-4 px-11.25 pb-6 pt-4.5 bg-erp-main">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-white">
                              Materiais de Composição
                            </h4>
                            <button
                              onClick={() =>
                                modalAddMaterialToProduct(row.original.id)
                              }
                              className={clsx(
                                'flex items-center gap-2 px-3 py-1.5',
                                'bg-blue-600 text-white text-sm',
                                'rounded-lg hover:bg-blue-700 transition-colors',
                              )}
                            >
                              <Plus size={16} />
                              Add Material
                            </button>
                          </div>
                          {row.original.materials.length > 0 ? (
                            <div
                              className={clsx(
                                'bg-gray-800 rounded-lg border border-gray-700',
                                'overflow-hidden',
                              )}
                            >
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-gray-900/50">
                                    <th className="text-left p-3 text-gray-400 text-sm">
                                      Material Name
                                    </th>
                                    <th className="text-right p-3 text-gray-400 text-sm">
                                      Required Qty
                                    </th>
                                    <th className="text-right p-3 text-gray-400 text-sm">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {row.original.materials.map((material) => (
                                    <tr
                                      key={material.rawMaterialId}
                                      className="border-t border-gray-700"
                                    >
                                      <td className="p-3 text-white">
                                        {material.name}
                                      </td>
                                      <td className="p-3 text-right text-white">
                                        {material.requiredQty}
                                      </td>
                                      <td className="p-3">
                                        <div className="flex items-center justify-end">
                                          <button
                                            onClick={() =>
                                              handleRemoveMaterial(
                                                material.productRawMaterialId,
                                              )
                                            }
                                            className={clsx(
                                              'p-1.5 text-red-400 hover:bg-gray-700',
                                              'rounded transition-colors',
                                            )}
                                            title="Delete"
                                          >
                                            <Trash2 size={16} />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              Nenhum material adicionado
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
      <PaginationController table={table} />
    </>
  );
};
