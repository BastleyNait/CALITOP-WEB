"use client";

import { useState, useTransition } from "react";
import { ProductType } from "@/types/database";
import {
    createProductType,
    updateProductType,
    deleteProductType,
} from "@/actions/product-types";

interface CategoriesManagerProps {
    initialCategories: ProductType[];
}

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

interface EditingState {
    id: string;
    name: string;
    color: string;
    sortOrder: number;
    isActive: boolean;
}

export function CategoriesManager({ initialCategories }: CategoriesManagerProps) {
    const [categories, setCategories] = useState<ProductType[]>(initialCategories);
    const [isPending, startTransition] = useTransition();

    // Creation form state
    const [showNew, setShowNew] = useState(false);
    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState("#F97316");
    const [newSortOrder, setNewSortOrder] = useState(0);
    const [createError, setCreateError] = useState<string | null>(null);

    // Editing state
    const [editing, setEditing] = useState<EditingState | null>(null);
    const [editError, setEditError] = useState<string | null>(null);

    // Delete confirm state
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    // ── Create ─────────────────────────────────────────────────────────────

    function handleCreate() {
        if (!newName.trim()) return;
        setCreateError(null);
        startTransition(async () => {
            const result = await createProductType({
                name: newName.trim(),
                slug: generateSlug(newName.trim()),
                color: newColor,
                sortOrder: newSortOrder,
                isActive: true,
            });
            if (!result.success) {
                setCreateError(result.error ?? "Error al crear la categoría");
                return;
            }
            if (result.data) {
                setCategories((prev) =>
                    [...prev, result.data!].sort((a, b) => a.sort_order - b.sort_order)
                );
            }
            setNewName("");
            setNewColor("#F97316");
            setNewSortOrder(0);
            setShowNew(false);
        });
    }

    // ── Update ────────────────────────────────────────────────────────────

    function startEdit(cat: ProductType) {
        setEditing({
            id: cat.id,
            name: cat.name,
            color: cat.color ?? "#F97316",
            sortOrder: cat.sort_order,
            isActive: cat.is_active,
        });
        setEditError(null);
    }

    function handleUpdate() {
        if (!editing || !editing.name.trim()) return;
        setEditError(null);
        startTransition(async () => {
            const result = await updateProductType(editing.id, {
                name: editing.name.trim(),
                slug: generateSlug(editing.name.trim()),
                color: editing.color,
                sortOrder: editing.sortOrder,
                isActive: editing.isActive,
            });
            if (!result.success) {
                setEditError(result.error ?? "Error al actualizar");
                return;
            }
            if (result.data) {
                setCategories((prev) =>
                    prev
                        .map((c) => (c.id === editing.id ? result.data! : c))
                        .sort((a, b) => a.sort_order - b.sort_order)
                );
            }
            setEditing(null);
        });
    }

    // ── Delete ────────────────────────────────────────────────────────────

    function handleDelete(id: string) {
        startTransition(async () => {
            const result = await deleteProductType(id);
            if (!result.success) return;
            setCategories((prev) => prev.filter((c) => c.id !== id));
            setConfirmDelete(null);
        });
    }

    // ─────────────────────────────────────────────────────────────────────

    return (
        <div className="space-y-6">
            {/* Add New Button */}
            {!showNew && (
                <button
                    onClick={() => setShowNew(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-black uppercase tracking-wider text-sm transition-all shadow-lg shadow-orange-500/20 hover:scale-105"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva Categoría
                </button>
            )}

            {/* New Category Form */}
            {showNew && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#F97316]">Nueva Categoría</h3>

                    {createError && (
                        <p className="text-red-400 text-xs font-semibold">{createError}</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Ej: Estaciones Totales"
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                Color
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={newColor}
                                    onChange={(e) => setNewColor(e.target.value)}
                                    className="w-10 h-9 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                                />
                                <span className="text-xs text-slate-400 font-mono">{newColor}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                Orden
                            </label>
                            <input
                                type="number"
                                value={newSortOrder}
                                onChange={(e) => setNewSortOrder(Number(e.target.value))}
                                min={0}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleCreate}
                            disabled={isPending || !newName.trim()}
                            className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-orange-600 disabled:opacity-40 text-white font-black text-sm uppercase tracking-wider transition-all"
                        >
                            {isPending ? "Guardando…" : "Crear"}
                        </button>
                        <button
                            onClick={() => { setShowNew(false); setCreateError(null); }}
                            className="px-5 py-2 rounded-xl border border-white/10 hover:border-white/20 text-slate-400 hover:text-white font-bold text-sm transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Categories Table */}
            <div className="rounded-2xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/3 px-6 py-3 border-b border-white/5">
                    <div className="w-8">Color</div>
                    <div className="pl-4">Nombre / Slug</div>
                    <div className="w-20 text-center">Orden</div>
                    <div className="w-20 text-center">Estado</div>
                    <div className="w-24 text-right">Acciones</div>
                </div>

                {categories.length === 0 && (
                    <div className="px-6 py-12 text-center text-slate-500 text-sm">
                        No hay categorías creadas aún.
                    </div>
                )}

                {categories.map((cat) => (
                    <div key={cat.id}>
                        {editing?.id === cat.id ? (
                            /* ── Edit Row ── */
                            <div className="px-6 py-4 border-b border-white/5 bg-white/5 space-y-3">
                                {editError && (
                                    <p className="text-red-400 text-xs font-semibold">{editError}</p>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            value={editing.name}
                                            onChange={(e) =>
                                                setEditing({ ...editing, name: e.target.value })
                                            }
                                            className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                            Color
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={editing.color}
                                                onChange={(e) =>
                                                    setEditing({ ...editing, color: e.target.value })
                                                }
                                                className="w-10 h-9 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                                            />
                                            <span className="text-xs text-slate-400 font-mono">{editing.color}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                            Orden
                                        </label>
                                        <input
                                            type="number"
                                            value={editing.sortOrder}
                                            onChange={(e) =>
                                                setEditing({ ...editing, sortOrder: Number(e.target.value) })
                                            }
                                            min={0}
                                            className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Active toggle */}
                                <label className="flex items-center gap-2 cursor-pointer w-fit">
                                    <div
                                        onClick={() =>
                                            setEditing({ ...editing, isActive: !editing.isActive })
                                        }
                                        className={`relative w-10 h-5 rounded-full transition-colors ${editing.isActive ? "bg-emerald-500" : "bg-slate-700"}`}
                                    >
                                        <div
                                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${editing.isActive ? "translate-x-5" : "translate-x-0.5"}`}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-slate-400">
                                        {editing.isActive ? "Activa" : "Inactiva"}
                                    </span>
                                </label>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleUpdate}
                                        disabled={isPending}
                                        className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-orange-600 disabled:opacity-40 text-white font-black text-sm uppercase tracking-wider transition-all"
                                    >
                                        {isPending ? "Guardando…" : "Guardar"}
                                    </button>
                                    <button
                                        onClick={() => { setEditing(null); setEditError(null); }}
                                        className="px-5 py-2 rounded-xl border border-white/10 hover:border-white/20 text-slate-400 hover:text-white font-bold text-sm transition-all"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* ── Display Row ── */
                            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-0 px-6 py-4 border-b border-white/5 hover:bg-white/3 transition-colors">
                                {/* Color swatch */}
                                <div className="w-8">
                                    <div
                                        className="w-6 h-6 rounded-full border-2 border-white/10 shadow-lg"
                                        style={{ backgroundColor: cat.color ?? "#F97316" }}
                                    />
                                </div>

                                {/* Name / Slug */}
                                <div className="pl-4">
                                    <p className="text-sm font-bold text-white leading-tight">{cat.name}</p>
                                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">{cat.slug}</p>
                                </div>

                                {/* Sort order */}
                                <div className="w-20 text-center">
                                    <span className="text-xs font-bold text-slate-400">{cat.sort_order}</span>
                                </div>

                                {/* Status badge */}
                                <div className="w-20 flex justify-center">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            cat.is_active
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                : "bg-slate-700/40 text-slate-500 border border-white/5"
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${cat.is_active ? "bg-emerald-400" : "bg-slate-500"}`} />
                                        {cat.is_active ? "Activa" : "Inactiva"}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="w-24 flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => startEdit(cat)}
                                        title="Editar"
                                        className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>

                                    {confirmDelete === cat.id ? (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                disabled={isPending}
                                                className="px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black hover:bg-red-500/30 transition-colors disabled:opacity-40"
                                            >
                                                Sí
                                            </button>
                                            <button
                                                onClick={() => setConfirmDelete(null)}
                                                className="px-2 py-1 rounded-lg border border-white/10 text-slate-400 text-[10px] font-black hover:border-white/20 transition-colors"
                                            >
                                                No
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfirmDelete(cat.id)}
                                            title="Desactivar"
                                            className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
