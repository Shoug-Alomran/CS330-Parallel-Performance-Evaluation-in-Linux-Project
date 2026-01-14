# VM and Linux Setup

This section describes the environment setup used for Phase I of the CS330 course project. A Linux-based virtual machine was used to ensure consistency and compatibility with system-level programming requirements.

## Development Environment

All experiments were conducted in a Linux environment running inside a virtual machine. This approach provides a controlled and reproducible setup independent of the host operating system.

### Host Systems
- macOS and Windows were used as host operating systems
- Virtualization allowed all team members to work within the same Linux environment

### Virtual Machine
- Virtual machine platform: **VirtualBox**
- Guest operating system: **Ubuntu Linux**
- The VM was allocated sufficient CPU cores and memory to support parallel execution

## Software Tools

The following tools were installed inside the Linux environment:

- **GCC compiler** for compiling C programs
- **Build-essential** package for standard development utilities
- Linux terminal for compilation and execution