# brew

## install

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## install check
```
brew doctor
```

## uninstall 

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

# oh-my-zsh

## install
```
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

# nvm

## install
```
brew install nvm
```

## uninstall
```
brew uninstall nvm
```

## environoment variable

```
vi ~/.bash_profile

export NVM_DIR="$HOME/.nvm"
. "$(brew --prefix nvm)/nvm.sh"

```

```
vi ~/.zshrc

export NVM_DIR="$HOME/.nvm"
. "$(brew --prefix nvm)/nvm.sh"
```

## install check
```
nvm ls
nvm --version
```

## version install
```
nvm install 5.2.0
nvm install 12
```

## version uninstall
```
nvm uninstall 5.2.0
nvm uninstall 12
```
