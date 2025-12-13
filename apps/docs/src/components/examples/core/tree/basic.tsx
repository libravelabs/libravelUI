"use client";

import { Tree, TreeItem, TreeContent } from "@/components/ui/core/tree";

export default function BasicTree() {
  return (
    <Tree aria-label="Application navigation menu">
      <TreeItem id="users" textValue="Users">
        <TreeContent>Users</TreeContent>
        <TreeItem id="all-users" textValue="All Users">
          <TreeContent>All Users</TreeContent>
        </TreeItem>
        <TreeItem id="roles" textValue="Roles">
          <TreeContent>Roles</TreeContent>
          <TreeItem id="admin-role" textValue="Admin">
            <TreeContent>Admin</TreeContent>
          </TreeItem>
          <TreeItem id="editor-role" textValue="Editor">
            <TreeContent>Editor</TreeContent>
          </TreeItem>
          <TreeItem id="viewer-role" textValue="Viewer">
            <TreeContent>Viewer</TreeContent>
          </TreeItem>
        </TreeItem>
        <TreeItem id="permissions" textValue="Permissions">
          <TreeContent>Permissions</TreeContent>
          <TreeItem id="read" textValue="Read Access">
            <TreeContent>Read Access</TreeContent>
          </TreeItem>
          <TreeItem id="write" textValue="Write Access">
            <TreeContent>Write Access</TreeContent>
          </TreeItem>
        </TreeItem>
      </TreeItem>

      <TreeItem id="products" textValue="Products">
        <TreeContent>Products</TreeContent>
        <TreeItem id="categories" textValue="Categories">
          <TreeContent>Categories</TreeContent>
          <TreeItem id="electronics" textValue="Electronics">
            <TreeContent>Electronics</TreeContent>
          </TreeItem>
          <TreeItem id="fashion" textValue="Fashion">
            <TreeContent>Fashion</TreeContent>
          </TreeItem>
          <TreeItem id="home" textValue="Home & Garden">
            <TreeContent>Home & Garden</TreeContent>
          </TreeItem>
        </TreeItem>
        <TreeItem id="inventory" textValue="Inventory">
          <TreeContent>Inventory</TreeContent>
        </TreeItem>
      </TreeItem>

      <TreeItem id="settings" textValue="Settings">
        <TreeContent>Settings</TreeContent>
        <TreeItem id="profile" textValue="Profile">
          <TreeContent>Profile</TreeContent>
        </TreeItem>
        <TreeItem id="preferences" textValue="Preferences">
          <TreeContent>Preferences</TreeContent>
        </TreeItem>
        <TreeItem id="security" textValue="Security">
          <TreeContent>Security</TreeContent>
        </TreeItem>
      </TreeItem>
    </Tree>
  );
}
