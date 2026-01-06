// Super Duplicator v2 - After Effects Script
// Duplicate compositions with selective nested comp control

(function(thisObj) {
    
    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    
    // Fungsi untuk scan semua nested comp secara rekursif
    function scanNestedComps(comp, level) {
        level = level || 0;
        var results = [];
        
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            
            if (layer.source instanceof CompItem) {
                var nestedComp = layer.source;
                
                // Cek apakah comp ini sudah pernah di-scan (hindari infinite loop)
                var alreadyScanned = false;
                for (var j = 0; j < results.length; j++) {
                    if (results[j].comp.id === nestedComp.id) {
                        alreadyScanned = true;
                        break;
                    }
                }
                
                if (!alreadyScanned) {
                    var item = {
                        comp: nestedComp,
                        level: level,
                        selected: true,
                        parent: comp
                    };
                    results.push(item);
                    
                    // Rekursif scan nested comp di dalamnya
                    var children = scanNestedComps(nestedComp, level + 1);
                    results = results.concat(children);
                }
            }
        }
        
        return results;
    }
    
    // Fungsi untuk membuat nama unik
    function makeUniqueName(baseName, suffix) {
        var proj = app.project;
        var newName = baseName + suffix;
        var counter = 1;
        
        // Cek apakah nama sudah ada
        var nameExists = true;
        while (nameExists) {
            nameExists = false;
            for (var i = 1; i <= proj.numItems; i++) {
                if (proj.item(i).name === newName) {
                    nameExists = true;
                    newName = baseName + suffix + "_" + counter;
                    counter++;
                    break;
                }
            }
        }
        
        return newName;
    }
    
    // Fungsi untuk membuat atau mendapatkan folder
    function getOrCreateFolder(folderName) {
        var proj = app.project;
        
        // Cek apakah folder sudah ada
        for (var i = 1; i <= proj.numItems; i++) {
            var item = proj.item(i);
            if (item instanceof FolderItem && item.name === folderName) {
                return item;
            }
        }
        
        // Buat folder baru
        return proj.items.addFolder(folderName);
    }
    
    // Fungsi duplikasi dengan selective nested comp
    function duplicateSelective(comp, selectedComps, duplicatedMap) {
        duplicatedMap = duplicatedMap || {};
        
        // Cek apakah comp ini sudah pernah diduplikasi
        if (duplicatedMap[comp.id]) {
            return duplicatedMap[comp.id];
        }
        
        // Duplikasi comp
        var newComp = comp.duplicate();
        duplicatedMap[comp.id] = newComp;
        
        // Proses setiap layer
        for (var i = 1; i <= newComp.numLayers; i++) {
            var layer = newComp.layer(i);
            
            if (layer.source instanceof CompItem) {
                var sourceComp = layer.source;
                
                // Cek apakah nested comp ini harus di-unique-kan
                var shouldDuplicate = false;
                for (var j = 0; j < selectedComps.length; j++) {
                    if (selectedComps[j].comp.id === sourceComp.id && selectedComps[j].selected) {
                        shouldDuplicate = true;
                        break;
                    }
                }
                
                if (shouldDuplicate) {
                    // Rekursif duplikasi nested comp
                    var nestedDupe = duplicateSelective(sourceComp, selectedComps, duplicatedMap);
                    layer.replaceSource(nestedDupe, false);
                }
            }
        }
        
        return newComp;
    }
    
    // ============================================
    // UI CREATION
    // ============================================
    
    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Super Duplicator v2", undefined);
        
        win.orientation = "column";
        win.alignChildren = ["fill", "top"];
        win.spacing = 10;
        win.margins = 16;
        
        // Header
        var headerGroup = win.add("group");
        headerGroup.orientation = "row";
        headerGroup.alignChildren = ["left", "center"];
        
        var titleText = headerGroup.add("statictext", undefined, "🎬 Super Duplicator v2");
        titleText.graphics.font = ScriptUI.newFont(titleText.graphics.font.name, "BOLD", 14);
        
        win.add("panel", undefined, undefined, {borderStyle: "black"});
        
        // Main Comp Info
        var infoGroup = win.add("group");
        infoGroup.orientation = "column";
        infoGroup.alignChildren = ["fill", "top"];
        infoGroup.spacing = 5;
        
        var compLabel = infoGroup.add("statictext", undefined, "Main Comp: (Pilih comp di Project Panel)");
        compLabel.graphics.foregroundColor = compLabel.graphics.newPen(win.graphics.PenType.SOLID_COLOR, [0.5, 0.5, 0.5], 1);
        
        // Tree List Group
        var treeGroup = win.add("group");
        treeGroup.orientation = "column";
        treeGroup.alignChildren = ["fill", "top"];
        treeGroup.spacing = 5;
        
        var treeLabel = treeGroup.add("statictext", undefined, "Nested Comps (centang untuk di-unique-kan):");
        treeLabel.graphics.font = ScriptUI.newFont(treeLabel.graphics.font.name, "BOLD", 11);
        
        // List box untuk tree view
        var listBox = treeGroup.add("listbox", undefined, [], {
            numberOfColumns: 2,
            showHeaders: false,
            columnTitles: ["Comp", "Level"]
        });
        listBox.preferredSize = [400, 250];
        listBox.itemSize = [380, 20];
        
        // Select buttons
        var btnGroup = win.add("group");
        btnGroup.orientation = "row";
        btnGroup.alignChildren = ["center", "center"];
        
        var selectAllBtn = btnGroup.add("button", undefined, "✓ Select All");
        var deselectAllBtn = btnGroup.add("button", undefined, "✗ Deselect All");
        
        win.add("panel", undefined, undefined, {borderStyle: "etched"});
        
        // Options
        var optionsGroup = win.add("group");
        optionsGroup.orientation = "column";
        optionsGroup.alignChildren = ["fill", "top"];
        optionsGroup.spacing = 8;
        
        var folderCheck = optionsGroup.add("checkbox", undefined, "📁 Buat folder baru untuk hasil duplikat");
        folderCheck.value = true;
        
        var folderNameGroup = optionsGroup.add("group");
        folderNameGroup.orientation = "row";
        folderNameGroup.alignChildren = ["left", "center"];
        folderNameGroup.spacing = 8;
        
        var folderNameLabel = folderNameGroup.add("statictext", undefined, "   Nama folder:");
        var folderNameInput = folderNameGroup.add("edittext", undefined, "");
        folderNameInput.preferredSize = [200, 25];
        folderNameInput.enabled = true;
        
        var selectResultCheck = optionsGroup.add("checkbox", undefined, "🎯 Auto-select hasil duplikat");
        selectResultCheck.value = true;
        
        var suffixGroup = optionsGroup.add("group");
        suffixGroup.orientation = "row";
        suffixGroup.alignChildren = ["left", "center"];
        suffixGroup.spacing = 8;
        
        var suffixLabel = suffixGroup.add("statictext", undefined, "Suffix nama:");
        var suffixInput = suffixGroup.add("edittext", undefined, "_Unique");
        suffixInput.preferredSize = [100, 25];
        
        win.add("panel", undefined, undefined, {borderStyle: "etched"});
        
        // Action Buttons
        var actionGroup = win.add("group");
        actionGroup.orientation = "row";
        actionGroup.alignChildren = ["center", "center"];
        actionGroup.spacing = 10;
        
        var scanBtn = actionGroup.add("button", undefined, "🔍 SCAN NESTED COMPS");
        scanBtn.preferredSize = [180, 35];
        
        var duplicateBtn = actionGroup.add("button", undefined, "🚀 DUPLIKAT SEKARANG");
        duplicateBtn.preferredSize = [180, 35];
        duplicateBtn.enabled = false;
        
        // Status
        var statusText = win.add("statictext", undefined, "Status: Siap", {multiline: false});
        statusText.graphics.foregroundColor = statusText.graphics.newPen(win.graphics.PenType.SOLID_COLOR, [0.3, 0.6, 0.3], 1);
        statusText.alignment = ["center", "top"];
        
        // ============================================
        // EVENT HANDLERS
        // ============================================
        
        var nestedComps = [];
        var mainComp = null;
        
        folderCheck.onClick = function() {
            folderNameInput.enabled = folderCheck.value;
            folderNameLabel.enabled = folderCheck.value;
        };
        
        scanBtn.onClick = function() {
            var proj = app.project;
            var selectedItems = proj.selection;
            
            if (selectedItems.length === 0 || !(selectedItems[0] instanceof CompItem)) {
                alert("⚠️ Pilih satu Main Comp di Project Panel dulu!");
                return;
            }
            
            mainComp = selectedItems[0];
            compLabel.text = "Main Comp: \"" + mainComp.name + "\"";
            
            // Scan nested comps
            statusText.text = "Status: Scanning nested comps...";
            win.update();
            
            nestedComps = scanNestedComps(mainComp);
            
            // Clear listbox
            listBox.removeAll();
            
            if (nestedComps.length === 0) {
                var item = listBox.add("item", "   (Tidak ada nested comp)");
                item.checked = false;
                item.enabled = false;
                duplicateBtn.enabled = false;
                statusText.text = "Status: Tidak ada nested comp ditemukan";
            } else {
                // Populate listbox
                for (var i = 0; i < nestedComps.length; i++) {
                    var indent = "";
                    for (var j = 0; j < nestedComps[i].level; j++) {
                        indent += "    ";
                    }
                    
                    var itemText = indent + "├─ " + nestedComps[i].comp.name;
                    var item = listBox.add("item", itemText);
                    item.checked = true;
                    item.data = i; // Store index
                }
                
                duplicateBtn.enabled = true;
                statusText.text = "Status: " + nestedComps.length + " nested comp(s) ditemukan";
                
                // Set default folder name
                folderNameInput.text = mainComp.name + "_Unique";
            }
        };
        
        selectAllBtn.onClick = function() {
            for (var i = 0; i < listBox.items.length; i++) {
                listBox.items[i].checked = true;
                if (listBox.items[i].data !== undefined) {
                    nestedComps[listBox.items[i].data].selected = true;
                }
            }
        };
        
        deselectAllBtn.onClick = function() {
            for (var i = 0; i < listBox.items.length; i++) {
                listBox.items[i].checked = false;
                if (listBox.items[i].data !== undefined) {
                    nestedComps[listBox.items[i].data].selected = false;
                }
            }
        };
        
        listBox.onChange = function() {
            // Update selected state
            for (var i = 0; i < listBox.items.length; i++) {
                if (listBox.items[i].data !== undefined) {
                    nestedComps[listBox.items[i].data].selected = listBox.items[i].checked;
                }
            }
        };
        
        duplicateBtn.onClick = function() {
            if (!mainComp) {
                alert("⚠️ Scan nested comps dulu!");
                return;
            }
            
            // Validasi
            var selectedCount = 0;
            for (var i = 0; i < nestedComps.length; i++) {
                if (nestedComps[i].selected) selectedCount++;
            }
            
            var confirmMsg = "Akan menduplikasi:\n";
            confirmMsg += "• Main Comp: " + mainComp.name + "\n";
            confirmMsg += "• " + selectedCount + " nested comp(s) akan di-unique-kan\n";
            confirmMsg += "• " + (nestedComps.length - selectedCount) + " nested comp(s) tetap shared\n\n";
            confirmMsg += "Lanjutkan?";
            
            if (!confirm(confirmMsg)) {
                return;
            }
            
            app.beginUndoGroup("Super Duplicate Selective");
            
            try {
                statusText.text = "Status: Duplicating...";
                win.update();
                
                // Duplikasi dengan selective nested comp
                var duplicatedMap = {};
                var newComp = duplicateSelective(mainComp, nestedComps, duplicatedMap);
                
                // Rename main comp
                var suffix = suffixInput.text || "_Unique";
                newComp.name = makeUniqueName(mainComp.name, suffix);
                
                // Rename nested comps yang diduplikasi
                for (var compId in duplicatedMap) {
                    if (duplicatedMap.hasOwnProperty(compId)) {
                        var dupComp = duplicatedMap[compId];
                        if (dupComp.id !== newComp.id) {
                            // Cari original name
                            for (var i = 0; i < nestedComps.length; i++) {
                                if (nestedComps[i].comp.id == compId && nestedComps[i].selected) {
                                    dupComp.name = makeUniqueName(nestedComps[i].comp.name, suffix);
                                    break;
                                }
                            }
                        }
                    }
                }
                
                // Buat folder jika dicentang
                var targetFolder = null;
                if (folderCheck.value) {
                    var folderName = folderNameInput.text || (mainComp.name + "_Unique");
                    targetFolder = getOrCreateFolder(folderName);
                    
                    // Pindahkan semua duplicated comps ke folder
                    newComp.parentFolder = targetFolder;
                    for (var compId in duplicatedMap) {
                        if (duplicatedMap.hasOwnProperty(compId)) {
                            var dupComp = duplicatedMap[compId];
                            if (dupComp.id !== newComp.id) {
                                dupComp.parentFolder = targetFolder;
                            }
                        }
                    }
                }
                
                // Auto-select hasil jika dicentang
                if (selectResultCheck.value) {
                    // Deselect all first
                    for (var i = 1; i <= app.project.numItems; i++) {
                        app.project.item(i).selected = false;
                    }
                    newComp.selected = true;
                }
                
                app.endUndoGroup();
                
                var totalDuped = 0;
                for (var k in duplicatedMap) {
                    if (duplicatedMap.hasOwnProperty(k)) totalDuped++;
                }
                
                statusText.text = "Status: ✓ Selesai! " + totalDuped + " comp(s) diduplikasi";
                alert("✓ Duplikasi selesai!\n\n" +
                      "Main Comp: " + newComp.name + "\n" +
                      "Total comps diduplikasi: " + totalDuped + "\n" +
                      (folderCheck.value ? "Folder: " + (targetFolder ? targetFolder.name : "N/A") : ""));
                
            } catch (e) {
                app.endUndoGroup();
                alert("❌ Error: " + e.toString());
                statusText.text = "Status: Error - " + e.message;
            }
        };
        
        // Layout
        win.layout.layout(true);
        win.layout.resize();
        win.onResizing = win.onResize = function() {
            this.layout.resize();
        };
        
        if (win instanceof Window) {
            win.center();
            win.show();
        } else {
            win.layout.layout(true);
        }
    }
    
    // ============================================
    // MAIN EXECUTION
    // ============================================
    
    buildUI(thisObj);
    
})(this);