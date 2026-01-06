# 🎬 Super Duplicator for After Effects

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

### Core Functionality
- Selective nested composition duplication — choose exactly which comps to make unique  
- Tree view with clear hierarchy display, regardless of depth  
- Recursive scanning of nested compositions  
- Safe handling of circular references to prevent infinite loops  
- Automatic folder organization for duplicated results  

### Workflow & Productivity
- Select All / Deselect All for batch operations  
- Custom suffix naming for duplicated compositions  
- Smart name conflict resolution (e.g. `Comp_Unique_2`)  
- Auto-select duplicated results  
- Full undo support (Ctrl+Z)  

### User Experience
- Real-time status and progress updates  
- Confirmation dialog with action summary  
- Modern, clean, and responsive UI  
- Visual hierarchy with indentation and checkbox controls  
- Improved error handling and stability  
- Optimized memory usage for large projects  


---

## 📥 Installation

### Method 1: ScriptUI Panels Folder (Recommended)

1. Download `Duplikat nested comp.jsx`
2. Navigate to your After Effects ScriptUI Panels folder:
   - **Windows**: `C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\ScriptUI Panels\`
   - **Mac**: `/Applications/Adobe After Effects [version]/Scripts/ScriptUI Panels/`
3. Copy the `.jsx` file into the ScriptUI Panels folder
4. Restart After Effects
5. Access from: `Window > Super Duplicator  `

### Method 2: Scripts Folder (Alternative)

1. Download `SuperDuplicator_v2.jsx`
2. Navigate to your After Effects Scripts folder:
   - **Windows**: `C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\`
   - **Mac**: `/Applications/Adobe After Effects [version]/Scripts/`
3. Copy the `.jsx` file
4. Restart After Effects
5. Access from: `File > Scripts > Super Duplicator  `

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

### Interface Layout

**Header**
- Super Duplicator

**Active Composition**
- Scene_01

**Nested Compositions**
- Background_Comp  
  - BG_Layer_1  
  - Shared_Texture  
- Text_Animations  
  - Title_Comp  
- Shared_Footer

**Options**
- Create new folder
- Auto-select duplicated results
- Suffix: `_Unique`

**Actions**
- Scan
- Duplicate

**Status**
- Ready


#### Tree View Example

```
Nested Compositions (check to make unique):
☑ ├─ Background_Comp          [Level 1] • 3 layers
☑     ├─ BG_Layer_1          [Level 2] • 2 layers
☐     └─ Shared_Texture      [Level 3] • 5 layers 🔗 (stays shared)
☑ ├─ Text_Animations          [Level 1] • 1 layer
☑     └─ Title_Comp          [Level 2] • 4 layers
☐ ├─ Shared_Footer            [Level 1] • 8 layers 🔗 (stays shared)
```

#### Options Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **📁 Create folder** | Checkbox | ✓ Enabled | Organize duplicates in a new folder |
| **Folder name** | Text input | `[CompName]_Unique` | Custom folder name |
| **🎯 Auto-select** | Checkbox | ✓ Enabled | Select result after duplication |
| **Suffix** | Text input | `_Unique` | Naming suffix for duplicated comps |

### Control Elements

| Control | Icon | Function | Behavior |
|---------|------|----------|----------|
| **Scan Button** | 🔍 | Analyze composition | Finds all nested comps and populates tree view |
| **Tree View List** | - | Display hierarchy | Shows nested comps with checkboxes for selection |
| **Select All** | ✓ | Toggle all ON | Checks all nested comps (complete independence) |
| **Deselect All** | ✗ | Toggle all OFF | Unchecks all (manual selection mode) |
| **Create Folder** | 📁 | Folder option | Creates dedicated folder for duplicated comps |
| **Folder Name** | - | Text input | Custom folder name (default: `CompName_Unique`) |
| **Auto-select** | 🎯 | Selection option | Auto-select duplicated comp after creation |
| **Suffix Input** | - | Text input | Custom suffix for comp names (default: `_Unique`) |
| **Duplicate Button** | 🚀 | Execute | Runs duplication with confirmation dialog |

#### Checkbox Behavior in Tree View

| State | Symbol | Meaning | Result |
|-------|--------|---------|--------|
| **Checked** | ☑ | Make unique | This comp will be duplicated independently |
| **Unchecked** | ☐ | Keep shared | This comp stays linked to original (shared reference) |
| **Indented** | `├─` or `└─` | Nested level | Visual indicator of composition hierarchy |

---

## 💡 Use Cases

### Use Case Comparison Table

| Scenario | Shared Comps (☐) | Unique Comps (☑) | Benefits |
|----------|------------------|-------------------|----------|
| **Client Variations** | Common transitions, effects, templates | Client logos, text, colors | Smaller project size, consistent branding |
| **Template System** | Universal animations, presets | Customizable elements | Reusable workflow, faster production |
| **Version Control** | Base animations, backgrounds | Experimental variations | Safe testing, easy rollback |
| **A/B Testing** | Shared assets, footage | Different approaches | Quick comparison, organized testing |
| **Project Cleanup** | Intentionally shared elements | Independent sections | Prevents cross-contamination |

### 1. Client Variations

**Scenario**: You need to create multiple versions of the same project for different clients.

**Strategy**:

| Element | Status | Reason |
|---------|--------|--------|
| Transitions | ☐ Keep shared | Consistent animation style |
| Effects | ☐ Keep shared | Same visual treatment |
| Logo animations | ☑ Make unique | Client-specific branding |
| Text overlays | ☑ Make unique | Different messaging |
| Color grading | ☑ Make unique | Brand color requirements |

**Result**: Each client version maintains shared animation quality while customizing branding elements.

### 2. Template System

**Scenario**: Building reusable templates with some shared, some unique elements.

**Workflow**:

```
Master Template
├─ ☐ Universal_Transitions (shared across all projects)
├─ ☐ Standard_Effects (consistent look)
└─ ☑ Content_Placeholder (unique per project)
```

**Benefits**:
- ✅ Smaller project files
- ✅ Consistent quality
- ✅ Faster turnaround
- ✅ Easy updates to shared elements

### 3. Version Control

**Scenario**: Testing different animation variations without affecting original.

**Approach**:

| Version | Background | Animation Style | Text Treatment |
|---------|------------|-----------------|----------------|
| Original | ☐ Shared | ☐ Original | ☐ Original |
| Test A | ☐ Shared | ☑ Style_A_Unique | ☐ Original |
| Test B | ☐ Shared | ☑ Style_B_Unique | ☐ Original |
| Test C | ☐ Shared | ☑ Style_C_Unique | ☑ Text_C_Unique |

**Advantage**: Isolated experimentation with easy comparison.

### 4. A/B Testing

**Scenario**: Testing two different approaches for the same scene.

**Configuration**:
```
Version A:
  ☑ Animation_Fast (unique - fast pacing)
  ☐ Background_Sunset (shared)
  ☐ Music_Track (shared)

Version B:
  ☑ Animation_Slow (unique - cinematic pacing)
  ☐ Background_Sunset (shared)
  ☐ Music_Track (shared)
```

**Outcome**: Easy side-by-side comparison with minimal duplication.

### 5. Cleanup Heavy Projects

**Scenario**: Project has too many shared comps, causing unintended changes.

**Before** (Problem):
```
Scene_01 ←→ Shared_Title ←→ Scene_02
  ↓                           ↓
Editing Scene_01        Breaks Scene_02! ❌
```

**After** (Solution):
```
Scene_01 → Title_Unique_01
Scene_02 → Title_Unique_02
  ↓                ↓
Independent!   Independent! ✅
```

**Implementation**:
1. Duplicate Scene_01
2. ☑ Select all nested comps (full independence)
3. Repeat for Scene_02
4. Result: Zero cross-contamination

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

## 👤 Developed by

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/dikapradnyanta">
        <img src="https://github.com/dikapradnyanta.png" width="120" alt="I Komang Dika Pradnyanta"/><br />
        <sub><b>I Komang Dika Pradnyanta</b></sub>
      </a>
    </td>
    <td>
      <a href="https://github.com/dikapradnyanta">
        <img src="https://github-readme-stats.vercel.app/api?username=dikapradnyanta&show_icons=true&theme=tokyonight&include_all_commits=true" />
      </a>
    </td>
  </tr>
</table>

<br clear="all" />

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
