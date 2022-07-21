import { Router } from 'express';

import { BuyProductController } from '@modules/products/useCases/buyProduct/BuyProductController';
import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController';
import { DeleteProductController } from '@modules/products/useCases/deleteProduct/DeleteProductController';
import { DeleteStockController } from '@modules/products/useCases/deleteStock/DeleteStockController';
import { EditProductController } from '@modules/products/useCases/editProduct/EditProductController';
import { EditStockController } from '@modules/products/useCases/editStock/EditStockController';
import { ListProductByIdController } from '@modules/products/useCases/listProductById/ListProductByIdController';
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController';
import { ListStockController } from '@modules/products/useCases/listStock/ListStockController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const productsRoutes = Router();

const createProductController = new CreateProductController();
const deleteProductController = new DeleteProductController();
const editProductController = new EditProductController();
const listProductsController = new ListProductsController();
const listProductByIdController = new ListProductByIdController();
const listStockController = new ListStockController();
const editStockController = new EditStockController();
const deleteStockController = new DeleteStockController();
const buyProductController = new BuyProductController();

productsRoutes.get('/', listProductsController.handle);
productsRoutes.get('/:id', listProductByIdController.handle);
productsRoutes.get('/list/stock', listStockController.handle);

productsRoutes.post('/', ensureAuthenticated, ensureAdmin, createProductController.handle);
productsRoutes.delete('/:id', ensureAuthenticated, ensureAdmin, deleteProductController.handle);
productsRoutes.patch('/edit/:id', ensureAuthenticated, ensureAdmin, editProductController.handle);
productsRoutes.patch('/edit/stock/:id', ensureAuthenticated, ensureAdmin, editStockController.handle);
productsRoutes.patch('/delete/stock/:id', ensureAuthenticated, ensureAdmin, deleteStockController.handle);

productsRoutes.patch('/buy/:id', ensureAuthenticated, buyProductController.handle);

export { productsRoutes };
