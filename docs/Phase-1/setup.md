<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Setup  
**Virtual Machine & Linux Environment Configuration**

This section documents the system environment used for all
experiments in Phase I, ensuring reproducibility and controlled execution.

</div>
</div>

---

## System Environment

All experiments were conducted inside a Linux virtual machine
to maintain consistency and eliminate host-system variability.

The VM was created using **UTM on macOS**, configured with
Apple’s native virtualization framework.

---

### Virtual Machine Creation

??? note "Creating a VM with UTM"
    ![Creating a VM with UTM](../Installing%20Ubuntu/1.%20Creating%20a%20VM%20with%20UTM.png)

??? note "Virtualize"
    ![Virtualize](../Installing%20Ubuntu/2.%20Virtualize.png)

---

### Operating System

- **Ubuntu 24.04.3 LTS**
- Architecture: **ARM64 (aarch64)**

??? note "Linux"
    ![Linux](../Installing%20Ubuntu/3.%20Linux.png)

---

### Resource Allocation

The VM was configured with:

- **4 GB RAM**
- **4 CPU cores**
- Adequate storage capacity for OS, source code, and output files

??? note "Memory and Cores"
    ![Memory and Cores](../Installing%20Ubuntu/4.%20Memory+Cores.png)

??? note "Storage"
    ![Storage](../Installing%20Ubuntu/7.%20Storage.png)

??? note "Storage Configuration"
    ![Storage Configuration](../Installing%20Ubuntu/9.%20Storage%20Configuration.png)

---

### System Verification

System verification commands were executed to confirm environment consistency:

```bash
uname -a
free -h
lsb_release -a
```

These confirmed:

* CPU architecture: **aarch64**
* Memory allocation
* Core count
* Ubuntu version

??? note "System Specifications"
    ![System Specifications](../Installing%20Ubuntu/16.%20System%20Specifications.png)

---

## Software Tools

The following tools were installed inside Ubuntu:

<div class="grid cards" markdown>

* ## :material-tools: **GCC Compiler**
  Version 11.4.0 used for compilation.

* ## :material-package-variant: **build-essential**
  Installed standard development utilities.

* ## :material-console: **Linux Terminal**
  Used for compilation, execution, and system monitoring.

</div>

---

### Installation Command

```bash
sudo apt install build-essential
```

### Compilation Command

```bash
gcc -Wall matrix_fork.c -o matrix_fork
```

The `-Wall` flag enables compiler warnings to promote safer and cleaner code.

??? note "Apple Virtualization"
    ![Apple Virtualization](../Installing%20Ubuntu/5.%20Apple%20Virtualization.png)

??? note "Ubuntu"
    ![Ubuntu](../Installing%20Ubuntu/6.%20Ubuntu.png)

---

This setup ensures that all experiments were conducted in a
controlled, reproducible Linux environment suitable for evaluating
process-based parallel performance.
