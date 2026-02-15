import { clsx } from 'clsx';
import { useState } from 'react';
import type { Materials } from '../../../types/ProductType';

interface ModalProprs {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  addMaterialToProduct: (productId: number, material: Materials) => void;
  idProduct: number;
}

export const ModalAddMaterial = ({
  idProduct,
  addMaterialToProduct,
  openModal,
  setOpenModal,
}: ModalProprs) => {
  const [addForm, setAddForm] = useState<Materials>({
    rawMaterialId: 0,
    requiredQty: 0,
    productRawMaterialId: 0,
  });

  const handleAddMaterial = () => {
    addMaterialToProduct(idProduct, addForm);
    setOpenModal(false);
  };
  return (
    <>
      {openModal ? (
        <div
          className={clsx(
            'fixed left-0 top-0',
            'w-full min-h-screen',
            'bg-[#030712b0]',
            'flex items-center justify-center',
          )}
        >
          <div
            className={clsx(
              'bg-erp-hover',
              'rounded-lg py-10 px-11.25',
              'border border-erp-subtle',
              'max-w-102 w-full',
              'flex flex-col items-center justify-center',
            )}
          >
            <h3 className="text-2xl font-extrabold text-white mb-10">
              Novo Material
            </h3>
            <div className="flex flex-col justify-center w-full">
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-2">
                  ID do Material
                </label>
                <input
                  type="number"
                  value={addForm.rawMaterialId}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      rawMaterialId: parseInt(e.target.value),
                    })
                  }
                  className={clsx(
                    'w-full px-4 py-2',
                    'bg-gray-900 text-white',
                    'focus:border-blue-600 focus:outline-none',
                    'border border-gray-700 rounded-lg',
                  )}
                  placeholder="Insira o nome do material"
                />
              </div>
              <div className="mb-8.5">
                <label className="block text-gray-400 text-sm mb-2">
                  Quantidade
                </label>
                <input
                  type="number"
                  value={addForm.requiredQty}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      requiredQty: parseInt(e.target.value),
                    })
                  }
                  className={clsx(
                    'w-full px-4 py-2',
                    'bg-gray-900 text-white',
                    'border border-gray-700 rounded-lg',
                    'focus:border-blue-600 focus:outline-none',
                  )}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <button
                onClick={handleAddMaterial}
                className={clsx(
                  'px-4 py-2',
                  'bg-blue-600 text-white',
                  'rounded-lg hover:bg-blue-700 transition-colors',
                )}
              >
                Salvar
              </button>
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                className={clsx(
                  'px-4 py-2',
                  'bg-gray-700 text-white',
                  'rounded-lg hover:bg-gray-600 transition-colors',
                )}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
