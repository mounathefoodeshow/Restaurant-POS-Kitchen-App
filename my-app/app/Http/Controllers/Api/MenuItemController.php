<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MenuItemController extends Controller
{
    public function index()
    {
        return response()->json(
            MenuItem::with('category')->get()
        );
    }
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string',
            'description' => 'nullable|string',
            'price'       => 'required|numeric',
            'image_url'   => 'nullable|image|max:2048',
            'is_available' => 'boolean',
        ]);

        $data = $request->except('image_url');

        if ($request->hasFile('image_url')) {
            $data['image_url'] = $request->file('image_url')->store('menu', 'public');
        }
        $item = MenuItem::create($data);
        return response()->json($item->load('category'), 201);
    }

    public function update(Request $request, MenuItem $menuItem)
    {
        $request->validate([
            'category_id'  => 'sometimes|exists:categories,id',
            'name'         => 'sometimes|string',
            'description'  => 'nullable|string',
            'price'        => 'sometimes|numeric',
            'image_url'    => 'nullable|image|max:2048',
            'is_available' => 'boolean',
        ]);

        $data = $request->except('image_url');

        if ($request->hasFile('image_url')) {
            if ($menuItem->image_url) {
                Storage::disk('public')->delete($menuItem->image_url);
            }
            $data['image_url'] = $request->file('image_url')->store('menu', 'public');
        }

        $menuItem->update($data);
        return response()->json($menuItem->load('category'));
    }
    public function destroy(MenuItem $menuItem)
    {
        if ($menuItem->image_url) {
            Storage::disk('public')->delete($menuItem->image_url);
        }
        $menuItem->delete();
        return response()->json(['message' => 'Menu item deleted']);
    }
    public function toggleAvailability(MenuItem $menuItem)
    {
        $menuItem->is_available = !$menuItem->is_available;
        $menuItem->save();
        return response()->json($menuItem);
    }
}
