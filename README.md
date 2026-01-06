# duplicate_comp_afterEfect# 🎬 Super Duplicator for After Effects

**Selective Nested Composition Duplicator with Full Control**

A powerful After Effects script that allows you to duplicate compositions with full control over which nested compositions should be uniqued or kept shared. Perfect for creating template variations, version management, and maintaining clean project structures.

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Detailed Usage](#-detailed-usage)
- [Use Cases](#-use-cases)
- [FAQ](#-faq)
- [Troubleshooting](#-troubleshooting)
- [Technical Details](#-technical-details)
- [Changelog](#-changelog)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features

- **Selective Duplication** - Choose exactly which nested compositions to make unique
- **Tree View Display** - See all nested comps in a hierarchical structure, no matter how deep
- **Smart Folder Management** - Automatically organize duplicated comps into a dedicated folder
- **Recursive Scanning** - Detects nested compositions at any depth level
- **Prevents Circular References** - Smart detection to avoid infinite loops

### 🛠️ Advanced Features

- **Custom Naming** - Define your own suffix for duplicated compositions
- **Auto-Select Results** - Automatically select the newly created composition
- **Batch Operations** - Select All / Deselect All for quick workflows
- **Smart Name Handling** - Automatically prevents name conflicts (e.g., `Comp_Unique_2`)
- **Undo Support** - Full undo group support (Ctrl+Z to revert)
- **Real-time Status** - Progress and status updates during operations

### 🎨 UI Features

- Clean, modern interface
- Visual hierarchy with indentation
- Checkbox control for each nested comp
- Configurable options panel
- Responsive layout

---

## 📥 Installation

### Method 1: ScriptUI Panels Folder (Recommended)

1. Download `SuperDuplicator_v2.jsx`
2. Navigate to your After Effects ScriptUI Panels folder:
   - **Windows**: `C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\ScriptUI Panels\`
   - **Mac**: `/Applications/Adobe After Effects [version]/Scripts/ScriptUI Panels/`
3. Copy the `.jsx` file into the ScriptUI Panels folder
4. Restart After Effects
5. Access from: `Window > Super Duplicator v2`

### Method 2: Scripts Folder (Alternative)

1. Download `SuperDuplicator_v2.jsx`
2. Navigate to your After Effects Scripts folder:
   - **Windows**: `C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\`
   - **Mac**: `/Applications/Adobe After Effects [version]/Scripts/`
3. Copy the `.jsx` file
4. Restart After Effects
5. Access from: `File > Scripts > Super Duplicator v2`

### Method 3: Run Script File (Quick Test)

1. In After Effects: `File > Scripts > Run Script File...`
2. Navigate to and select `SuperDuplicator_v2.jsx`
3. The script will open as a floating window

---

## 🚀 Quick Start

### Basic Workflow (5 Steps)

```
1. Select Main Comp → 2. Scan → 3. Choose Comps → 4. Configure → 5. Duplicate
```

#### Step-by-Step:

1. **Select Your Main Composition** in the Project Panel
2. **Click "SCAN NESTED COMPS"** button
3. **Check/Uncheck** nested comps you want to unique
4. **Configure options** (folder name, suffix, etc.)
5. **Click "DUPLIKAT SEKARANG"** to execute

### Example Result:

**Before:**
```
📁 Project
  └─ Main_Comp (uses Nested_A, Nested_B)
      ├─ Nested_A (uses Nested_C)
      │   └─ Nested_C
      └─ Nested_B
```

**After (all checked):**
```
📁 Project
  ├─ Main_Comp (original, unchanged)
  └─ 📁 Main_Comp_Unique
      └─ Main_Comp_Unique
          ├─ Nested_A_Unique
          │   └─ Nested_C_Unique
          └─ Nested_B_Unique
```

---

## 📖 Detailed Usage

### Interface Overview

```
┌─────────────────────────────────────────┐
│ 🎬 Super Duplicator v2                  │
├─────────────────────────────────────────┤
│ Main Comp: "Scene_01"                   │
│                                         │
│ Nested Comps (centang untuk unique):   │
│ ☑ ├─ Background_Comp                   │
│ ☑     ├─ BG_Layer_1                    │
│ ☐     └─ Shared_Texture                │
│ ☑ ├─ Text_Animations                   │
│ ☑     └─ Title_Comp                    │
│ ☐ ├─ Shared_Footer                     │
│                                         │
│ [✓ Select All]  [✗ Deselect All]       │
│                                         │
│ ☑ 📁 Buat folder baru                   │
│    Nama folder: [Scene_01_Unique]      │
│ ☑ 🎯 Auto-select hasil duplikat         │
│ Suffix nama: [_Unique]                 │
│                                         │
│ [🔍 SCAN]  [🚀 DUPLIKAT SEKARANG]       │
│                                         │
│ Status: Siap                            │
└─────────────────────────────────────────┘
```

### Control Elements

#### 1. Scan Button (🔍 SCAN NESTED COMPS)
- **Function**: Analyzes selected composition and finds all nested comps
- **Action**: Populates the tree view with all nested compositions
- **When to use**: After selecting a main comp in Project Panel

#### 2. Tree View List
- **Function**: Displays all nested compositions in hierarchical structure
- **Checkboxes**: Check = unique this comp, Uncheck = keep shared
- **Indentation**: Shows nesting levels (more indent = deeper nesting)

#### 3. Select All / Deselect All
- **Function**: Quickly toggle all checkboxes
- **Use case**: 
  - Select All: When you want complete independence
  - Deselect All: When you want to manually select specific comps

#### 4. Folder Options
- **Create Folder Checkbox**: Enable/disable folder creation
- **Folder Name Input**: Custom name for the folder (default: `[MainCompName]_Unique`)
- **Behavior**: All duplicated comps will be moved into this folder

#### 5. Auto-select Option
- **Function**: Automatically select the main duplicated comp after operation
- **Benefit**: Quick access to your new comp for immediate editing

#### 6. Suffix Input
- **Function**: Define custom suffix for duplicated comp names
- **Default**: `_Unique`
- **Examples**: `_Copy`, `_v2`, `_Client`, `_Draft`

#### 7. Duplicate Button (🚀 DUPLIKAT SEKARANG)
- **Function**: Executes the duplication with current settings
- **Confirmation**: Shows summary dialog before proceeding
- **Result**: Creates new composition structure based on selections

---

## 💡 Use Cases

### 1. Client Variations
**Scenario**: You need to create multiple versions of the same project for different clients.

**Solution**:
- Duplicate the main comp
- Keep shared elements (logos, transitions) unchecked
- Unique only client-specific content (text, colors)
- Each version stays small and manageable

```
Project A → shares: transitions, effects
         → unique: client logo, text

Project B → shares: transitions, effects
         → unique: client logo, text
```

### 2. Template System
**Scenario**: Building reusable templates with some shared, some unique elements.

**Solution**:
- Create master template comp
- Duplicate for each use case
- Keep common animations shared (save space)
- Unique only customizable parts

### 3. Version Control
**Scenario**: Testing different animation variations without affecting original.

**Solution**:
- Duplicate main comp
- Uncheck all nested comps initially
- Only unique the specific comp you want to experiment with
- Original stays intact, easy to compare

### 4. A/B Testing
**Scenario**: Testing two different approaches for the same scene.

**Solution**:
```
Version A: ☑ Animation_Style_1  ☐ Background (shared)
Version B: ☑ Animation_Style_2  ☐ Background (shared)
```

### 5. Cleanup Heavy Projects
**Scenario**: Project has too many shared comps, causing unintended changes.

**Solution**:
- Duplicate sections that need independence
- Select All nested comps
- Creates fully independent section
- Prevents accidental cross-contamination

---

## ❓ FAQ

### Q: What's the difference between this and regular duplicate?
**A**: Regular duplicate (Ctrl+D) only duplicates the top-level comp - all nested comps remain shared. This script lets you choose which nested comps to make unique, preventing unintended changes across your project.

### Q: What happens to comps I don't check?
**A**: Unchecked nested comps will remain shared - the duplicated main comp will still reference the original nested comp. Changes to that nested comp will affect both the original and duplicated version.

### Q: Can I undo the duplication?
**A**: Yes! The script uses proper undo groups. Just press Ctrl+Z (Cmd+Z on Mac) to completely revert the operation.

### Q: Does this work with deeply nested compositions?
**A**: Yes! The script recursively scans to any depth level and displays them all in the tree view with proper indentation.

### Q: What if I have circular references?
**A**: The script has built-in circular reference detection to prevent infinite loops. Each comp is only scanned once.

### Q: Can I duplicate multiple main comps at once?
**A**: Currently, you need to select one main comp at a time. Run the script multiple times for multiple comps.

### Q: What happens if a comp name already exists?
**A**: The script automatically adds a number suffix (e.g., `Comp_Unique_2`, `Comp_Unique_3`) to prevent conflicts.

### Q: Will this increase my project file size?
**A**: Yes, uniqued comps create duplicates of the composition structure. However, the actual layer sources (footage, images) are not duplicated - they remain referenced, so the size increase is minimal.

### Q: Can I change the folder name after creation?
**A**: Yes, you can manually rename the folder in After Effects after the script completes. The references will remain intact.

### Q: Does this work with Expression references?
**A**: Expression references to duplicated comps will still point to the original. You'll need to manually update expressions if they reference nested comp names.

---

## 🔧 Troubleshooting

### Issue: "Pilih satu Main Comp di Project Panel dulu!" error

**Cause**: No composition selected or non-comp item selected

**Solution**: 
1. Click on a composition in the Project Panel (not Timeline)
2. Make sure it's highlighted/selected
3. Click Scan button again

---

### Issue: Scan button shows "Tidak ada nested comp ditemukan"

**Cause**: Selected composition has no nested compositions

**Solution**: This is normal if your comp has no pre-comps. The composition contains only layers without any nested compositions.

---

### Issue: Script window doesn't appear

**Cause**: Script not properly installed or After Effects needs restart

**Solution**:
1. Verify file is in correct folder (see Installation)
2. Restart After Effects completely
3. Check `Window` menu for script name
4. Try running via `File > Scripts > Run Script File...`

---

### Issue: Duplicate button stays disabled

**Cause**: Haven't scanned a composition yet

**Solution**: 
1. Select a composition in Project Panel
2. Click "SCAN NESTED COMPS" first
3. Duplicate button will enable after successful scan

---

### Issue: Error during duplication

**Cause**: Various possible causes (locked layers, missing sources, etc.)

**Solution**:
1. Press Ctrl+Z to undo
2. Check Project Panel for missing footage (colored bars)
3. Unlock all layers in compositions
4. Try again with fewer nested comps selected
5. If error persists, note the error message and report

---

### Issue: Expressions break after duplication

**Cause**: Expressions referencing duplicated comp names still point to original

**Solution**: This is expected behavior. After duplication, manually update expressions that reference comp names:
```javascript
// Before
thisComp.layer("Nested_Comp").transform.position

// After (update to new name)
thisComp.layer("Nested_Comp_Unique").transform.position
```

---

### Issue: Script runs very slowly

**Cause**: Project has many deeply nested compositions

**Solution**: 
- This is normal for complex projects
- The script needs to analyze entire hierarchy
- Wait for "Status: Selesai" message
- Consider breaking up extremely complex comp structures

---

## 🔍 Technical Details

### How It Works

1. **Scanning Phase**
   ```javascript
   scanNestedComps() // Recursive function
   → Loops through all layers
   → Identifies CompItem sources
   → Tracks hierarchy level
   → Prevents circular scanning
   → Returns flat array with level data
   ```

2. **Duplication Phase**
   ```javascript
   duplicateSelective() // Recursive function
   → Duplicates main comp
   → Iterates through layers
   → Checks if nested comp is selected
   → If selected: recursive duplicate + replace
   → If not: keeps original reference
   → Returns duplicated comp
   ```

3. **Organization Phase**
   ```javascript
   → Generates unique names
   → Creates folder (if enabled)
   → Moves all duplicated comps
   → Applies custom suffix
   → Selects result (if enabled)
   ```

### Data Structure

```javascript
nestedComps = [
  {
    comp: CompItem,      // Reference to AE composition
    level: Number,       // Nesting depth (0 = direct child)
    selected: Boolean,   // User selection state
    parent: CompItem     // Parent composition
  },
  ...
]
```

### Algorithm Complexity

- **Time**: O(n × m) where n = nested comps, m = average layers per comp
- **Space**: O(n) for storing nested comp references
- **Depth**: Unlimited nesting levels supported

### Compatibility

- **After Effects**: CC 2015 and later
- **OS**: Windows & macOS
- **Language**: ExtendScript (JavaScript-based)

### Limitations

- One main comp per operation (not batch)
- Expression references not auto-updated
- Cannot access comps in locked layers
- Maximum 100 nested comps (UI limit, not technical)

---

## 📝 Changelog

### v2.0.0 (Current)
- ✨ NEW: Selective nested comp duplication
- ✨ NEW: Tree view with hierarchy display
- ✨ NEW: Automatic folder organization
- ✨ NEW: Select All / Deselect All buttons
- ✨ NEW: Custom suffix naming
- ✨ NEW: Auto-select duplicated result
- ✨ NEW: Smart name conflict resolution
- ✨ NEW: Real-time status updates
- ✨ NEW: Confirmation dialog with summary
- 🐛 FIX: Circular reference handling
- 🐛 FIX: Memory optimization for large projects
- 💎 IMPROVED: Modern UI design
- 💎 IMPROVED: Better error handling

### v1.0.0 (Original)
- Basic recursive duplication
- Simple button interface
- Duplicates all nested comps (no selection)

---

## 📄 License

**MIT License**

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 🤝 Contributing

Found a bug? Have a feature request? Want to improve the code?

**Ways to contribute:**
1. Report issues with detailed steps to reproduce
2. Suggest features via discussions
3. Submit pull requests with improvements
4. Share your use cases and workflows
5. Help improve documentation

---

## 💬 Support

- **Issues**: Report bugs and request features
- **Discussions**: Ask questions and share tips
- **Email**: [Your contact email]

---

## 🙏 Credits

**Developed by**: [Your Name]
**Inspired by**: Community requests for better comp management
**Special Thanks**: After Effects scripting community

---

## 🎯 Tips & Best Practices

### Workflow Tips

1. **Scan First, Think Later**
   - Always scan first to see the full structure
   - Don't rush to select/deselect
   - Understand your hierarchy before duplicating

2. **Use Descriptive Suffixes**
   - `_Client_A`, `_Client_B` for client versions
   - `_v1`, `_v2` for iterations
   - `_Test` for experimental versions
   - `_Final` for approved versions

3. **Folder Naming Convention**
   ```
   ProjectName_Purpose_Date
   Examples:
   - Commercial_ClientA_2025
   - Promo_TestVersion_Jan06
   - Social_InstagramVersion_Final
   ```

4. **Selective Strategy**
   - Keep shared: Transitions, effects, common animations
   - Make unique: Client-specific content, text, colors
   - Result: Smaller project, faster workflow

5. **Version Control Workflow**
   ```
   Master_Comp (never edit directly)
   ├─ Version_A (experimental)
   ├─ Version_B (alternative approach)
   └─ Version_Final (approved)
   ```

### Performance Tips

1. **Scan Early**: Scan at project start to understand structure
2. **Selective Duplication**: Don't unique everything if not needed
3. **Clean Before Duplicate**: Remove unused comps first
4. **Folder Organization**: Keep duplicates in folders to avoid clutter

### Project Organization

```
📁 Project
  ├─ 📁 Assets (footage, images)
  ├─ 📁 Master_Comps (templates, never edit)
  ├─ 📁 Working_Versions (active edits)
  │   ├─ 📁 Scene01_Unique
  │   ├─ 📁 Scene02_Unique
  │   └─ 📁 Scene03_Unique
  └─ 📁 Archive (old versions)
```

---

## 🎓 Learning Resources

### Recommended Reading
- [After Effects Scripting Guide](https://ae-scripting.docsforadobe.dev/)
- [ExtendScript Toolkit User Guide](https://extendscript.docsforadobe.dev/)
- [After Effects Scripting Reference](https://ae-scripting.docsforadobe.dev/introduction/overview.html)

### Video Tutorials
- Coming soon: Step-by-step video tutorial
- Coming soon: Advanced workflow examples

---

**Made with ❤️ for the After Effects Community**

*Last Updated: January 2025*