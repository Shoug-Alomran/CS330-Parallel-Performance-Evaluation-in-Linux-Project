<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Commands Reference

Essential Linux commands used throughout the CS330 project  
for environment setup, compilation, execution, monitoring, and system management.

</div>
</div>

---

## System Verification

### System Information

??? example "Kernel & OS Information"
    ```bash
    uname -a              # Full system information
    uname -s              # Kernel name
    uname -m              # Architecture
    lsb_release -a        # Ubuntu version
    cat /etc/os-release   # OS details
    ```

### Hardware Resources

??? example "Memory, CPU & Disk"
    ```bash
    free -h               # Memory usage
    lscpu                 # CPU details
    df -h                 # Disk usage
    cat /proc/meminfo     # Detailed memory info
    ```

---

## Package Management (APT)

??? example "Installing & Managing Packages"
    ```bash
    sudo apt update
    sudo apt upgrade
    sudo apt install build-essential
    sudo apt install nano htop git
    sudo apt remove package-name
    sudo apt autoremove
    sudo apt clean
    ```

---

## File Operations

??? example "Navigation & File Management"
    ```bash
    ls -la
    mkdir project-name
    cd /path/to/directory
    cd ~

    cp source.txt destination.txt
    cp -r source_dir/ destination_dir/

    mv oldname.txt newname.txt
    rm filename.txt
    rm -r directory_name/

    cat filename.txt
    head -20 filename.txt
    tail -15 filename.txt
    ```

---

## Text Editing

??? example "Using nano"
    ```bash
    nano filename.c

    # Ctrl+O  Save
    # Ctrl+X  Exit
    # Ctrl+K  Cut line
    # Ctrl+U  Paste
    # Ctrl+W  Search
    # Ctrl+\  Replace

    less filename.c
    ```

---

## Compilation (GCC)

??? example "Common GCC Flags"
    ```bash
    gcc program.c -o program
    gcc -Wall program.c -o program
    gcc -g program.c -o program
    gcc -O2 program.c -o program
    gcc program.c -o program -lm
    gcc main.c utils.c -o program
    ```

---

## Program Execution

??? example "Running Programs"
    ```bash
    ./program
    chmod +x program
    time ./program

    ./program > output.txt
    ./program 2> error.txt
    ./program > output.txt 2>&1
    ./program &
    ```

---

## CS330 Matrix Program

??? example "Build & Run matrix_fork.c"
    ```bash
    gcc -Wall matrix_fork.c -o matrix_fork
    ./matrix_fork
    gcc -Wall matrix_fork.c -o matrix_fork && ./matrix_fork
    ```

---

## Process Monitoring

??? example "Inspect Running Processes"
    ```bash
    ps
    ps aux
    ps -ef
    top
    htop
    pstree
    ps -u $USER
    pgrep program_name
    ps aux | grep program_name
    ```

---

## Process Control

??? example "Signals & Termination"
    ```bash
    kill -SIGINT process_id
    kill process_id
    kill -TERM process_id
    kill -9 process_id

    pkill program_name
    killall program_name

    kill -STOP process_id
    kill -CONT process_id
    ```

---

## Background & Job Control

??? example "Managing Jobs"
    ```bash
    ./program &
    jobs
    fg %1
    bg %1
    disown
    ```

---

## Performance Monitoring

??? example "CPU & System Performance"
    ```bash
    top
    htop
    mpstat
    iostat
    vmstat 1
    top -p process_id
    ```

---

## Logs & System Status

??? example "System Logs"
    ```bash
    dmesg | tail -50
    journalctl -xe
    last
    uptime
    date
    timedatectl
    ```

---

## Git Version Control

### Project Repository

- Official GitHub repository:
  [CS330-Parallel-Performance-Evaluation-in-Linux-Project](https://github.com/Shoug-Alomran/CS330-Parallel-Performance-Evaluation-in-Linux-Project)

??? example "Basic Git Workflow"
    ```bash
    git clone https://github.com/Shoug-Alomran/CS330-Parallel-Performance-Evaluation-in-Linux-Project.git
    git status
    git add .
    git commit -m "Description of changes"
    git push origin main
    git pull origin main
    git log --oneline --graph
    git checkout -b feature-branch
    ```

---

## Virtualization (UTM / VM Diagnostics)

??? example "Virtual Machine Checks"
    ```bash
    ps aux | grep -i utm
    systemctl status libvirtd
    virt-host-validate
    kvm-ok
    ```

---

## Terminal Shortcuts

??? example "Keyboard Shortcuts"
    ```
    Ctrl+C   Interrupt process
    Ctrl+Z   Suspend process
    Ctrl+D   Exit shell
    Ctrl+L   Clear screen
    Ctrl+R   Search history
    Ctrl+A   Start of line
    Ctrl+E   End of line
    Ctrl+U   Clear before cursor
    Ctrl+K   Clear after cursor
    Tab      Autocomplete
    ```

---

## Command Operators

??? example "Chaining & Redirection"
    ```bash
    command1 && command2
    command1 ; command2
    command1 | command2
    command 2>&1
    command | wc -l
    command | grep pattern
    ```

---

## Complete Build–Run Workflow

??? example "Full Project Cycle"
    ```bash
    cd ~/os-project/src
    nano matrix_fork.c
    gcc -Wall matrix_fork.c -o matrix_fork
    ./matrix_fork
    htop
    ```

---

## Quick Testing Loops

??? example "Automated Test Runs"
    ```bash
    nano matrix_fork.c && gcc -Wall matrix_fork.c -o matrix_fork && ./matrix_fork

    for i in {1..3}; do echo "Run $i:"; ./matrix_fork; done
    for i in {1..5}; do echo "Run $i:"; time ./matrix_fork; done
    ```
