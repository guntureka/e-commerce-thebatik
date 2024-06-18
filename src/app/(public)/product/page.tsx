import React from 'react'
import { Metadata } from 'next'
import { Product } from "@prisma/client";
import { useState } from 'react';
import { getAllProducts } from '@/lib/actions/product';
import ProductsView from '@/components/products-page/products-view';

export default async function ProductsPage() {
  const products = await getAllProducts();
  return(
    <ProductsView products={products} />
  )
}

