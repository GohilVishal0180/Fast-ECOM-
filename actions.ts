"use server"

import { revalidatePath } from "next/cache"

export async function createProduct(formData: FormData) {
  try {
    const product = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category: formData.get("category"),
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error("Failed to create product")
    }

    revalidatePath("/seller/products")
    return { success: true }
  } catch (error) {
    return { error: "Something went wrong" }
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const product = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category: formData.get("category"),
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error("Failed to update product")
    }

    revalidatePath("/seller/products")
    return { success: true }
  } catch (error) {
    return { error: "Something went wrong" }
  }
}

export async function deleteProduct(productId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/products/${productId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete product")
    }

    revalidatePath("/seller/products")
    return { success: true }
  } catch (error) {
    return { error: "Something went wrong" }
  }
}

