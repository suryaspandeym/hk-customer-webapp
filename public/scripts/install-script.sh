y# Install npm

# Install npm using fnm
curl -fsSL https://fnm.vercel.app/install | bash

# Use specific npm version
eval "$(fnm env --use-on-cd)"
fnm use v18.16.0

# Check the current shell
SHELL_NAME=$(basename "$SHELL")

# Source the appropriate configuration file
if [ "$SHELL_NAME" = "bash" ]; then
    source "$HOME/.bashrc"
elif [ "$SHELL_NAME" = "zsh" ]; then
    source "$HOME/.zshrc"
else
    echo "Unsupported shell: $SHELL_NAME"
fi

# Install Yarn globally
npm install --global yarn

# Install project dependencies
yarn