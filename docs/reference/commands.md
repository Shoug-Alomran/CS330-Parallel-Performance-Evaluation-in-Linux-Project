# Commands Reference

This page documents essential commands used throughout the CS330 project for environment setup, compilation, execution, monitoring, and system management.

---

??? example "System Verification – System Information"
```bash
    # Display all system information
    uname -a

    # Show only kernel name
    uname -s

    # Show machine hardware name (architecture)
    uname -m

    # Check Ubuntu version
    lsb_release -a
    cat /etc/os-release

```

---

??? example "System Verification – Hardware Resources"
```bash
    # Display memory usage in human-readable format
    free -h

    # Show CPU information
    lscpu

    # Display disk usage
    df -h

    # Check available memory and swap
    cat /proc/meminfo
    ```

---

??? example "Package Management"

```bash
# Update package lists
sudo apt update

# Upgrade installed packages
sudo apt upgrade

# Install build essentials (GCC, make, etc.)
sudo apt install build-essential

# Install specific packages
sudo apt install nano htop git

# Remove packages
sudo apt remove package-name

# Clean up package cache
sudo apt autoremove
sudo apt clean
```

---

??? example "File Operations – Basic Commands"

```bash
# List files with details
ls -la

# Create directory
mkdir project-name

# Change directory
cd /path/to/directory

# Go to home directory
cd ~

# Copy files
cp source.txt destination.txt
cp -r source_dir/ destination_dir/

# Move/rename files
mv oldname.txt newname.txt

# Remove files
rm filename.txt
rm -r directory_name/

# View file contents
cat filename.txt
head -20 filename.txt
tail -15 filename.txt
```

---

??? example "Text Editing (nano)"

```bash
# Edit file with nano
nano filename.c

# Ctrl+O: Save file
# Ctrl+X: Exit nano
# Ctrl+K: Cut line
# Ctrl+U: Paste
# Ctrl+W: Search
# Ctrl+\: Replace

# View file without editing
less filename.c
```

---

??? example "Compilation Commands (GCC)"

```bash
# Basic compilation
gcc program.c -o program

# Compile with all warnings
gcc -Wall program.c -o program

# Compile with debugging information
gcc -g program.c -o program

# Compile with optimization
gcc -O2 program.c -o program

# Compile with math library
gcc program.c -o program -lm

# Compile multiple files
gcc main.c utils.c -o program
```

---

??? example "Program Execution"

```bash
# Run compiled program
./program

# Make file executable
chmod +x program

# Run with time measurement
time ./program

# Redirect output
./program > output.txt
./program 2> error.txt
./program > output.txt 2>&1

# Run in background
./program &
```

---

??? example "Matrix Multiplication Program"

```bash
# Compile the matrix multiplication program
gcc -Wall matrix_fork.c -o matrix_fork

# Run with default parameters
./matrix_fork

# Quick recompile and run
gcc -Wall matrix_fork.c -o matrix_fork && ./matrix_fork
```

---

??? example "Process Monitoring"

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

??? example "Process Control"

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

??? example "Background & Foreground Jobs"

```bash
./program &

jobs
fg %1
bg %1

disown
```

---

??? example "Network & SSH"

```bash
ip addr show
ifconfig

ping google.com

netstat -tulpn

nslookup google.com
dig google.com
```

---

??? example "System Monitoring & Performance"

```bash
top
htop

mpstat
iostat
vmstat 1

top -p process_id
```

---

??? example "Logs and System Information"

```bash
dmesg | tail -50
journalctl -xe

last
uptime

date
timedatectl
```

---

??? example "Git Version Control"

```bash
git clone https://github.com/username/repo.git
git status
git add .
git commit -m "Description of changes"
git push origin main
git pull origin main
git log --oneline --graph
git checkout -b feature-branch
```

---

??? example "Virtual Machine Management (UTM / Virtualization)"

```bash
ps aux | grep -i utm

systemctl status libvirtd
virt-host-validate

kvm-ok
```

---

??? example "Terminal Shortcuts"

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

??? example "Command Combinations"

```bash
command1 && command2
command1 ; command2

command1 | command2

command 2>&1

command | wc -l
command | grep pattern
```

---

??? example "Complete Build–Run Workflow"

```bash
cd ~/os-project/src
nano matrix_fork.c
gcc -Wall matrix_fork.c -o matrix_fork
./matrix_fork
htop
```

---

??? example "Quick Testing Workflow"

```bash
nano matrix_fork.c && gcc -Wall matrix_fork.c -o matrix_fork && ./matrix_fork

for i in {1..3}; do echo "Run $i:"; ./matrix_fork; done

for i in {1..5}; do echo "Run $i:"; time ./matrix_fork; done
```

