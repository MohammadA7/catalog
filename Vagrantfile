# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04"
  config.vm.box_version = "= 2.3.5"
  config.vm.synced_folder ".", "/vagrant"
  config.vm.network "forwarded_port", guest: 8000, host: 8000, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 5000, host: 5000, host_ip: "127.0.0.1"

  # Work around disconnected virtual network cable.
  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--cableconnected1", "on"]
  end

  config.vm.provision "shell", inline: <<-SHELL
    apt-get -qqy update

    # Work around https://github.com/chef/bento/issues/661
    # apt-get -qqy upgrade
    DEBIAN_FRONTEND=noninteractive apt-get -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" upgrade

    apt-get -qqy install make zip unzip postgresql

    apt-get -qqy install python3 python3-pip
    pip3 install --upgrade pip
    pip3 install -r /vagrant/catalog-backend/requirements.txt

    apt-get -qqy install python python-pip
    pip2 install --upgrade pip
    pip2 install -r  /vagrant/catalog-backend/requirements.txt

    su postgres -c 'createuser -dRS vagrant'
    su vagrant -c 'createdb'
    su vagrant -c 'createdb catalog'
    su vagrant -c 'psql forum -f /vagrant/forum/forum.sql'

    vagrantTip="[35m[1mThe shared directory is located at /vagrant\\nTo access your shared files: cd /vagrant[m"
    echo -e $vagrantTip > /etc/motd

    wget https://nodejs.org/dist/v10.15.0/node-v10.15.0-linux-x64.tar.xz
    sudo mkdir /usr/local/lib/nodejs
    sudo tar -xJvf node-v10.15.0-linux-x64.tar.xz -C /usr/local/lib/nodejs
    sudo mv /usr/local/lib/nodejs/node-v10.15.0-linux-x64 /usr/local/lib/nodejs/node-v10.15.0
    echo "export NODEJS_HOME=/usr/local/lib/nodejs/node-v10.15.0/bin" >> ~/.profile
    echo "export PATH=$NODEJS_HOME:$PATH" >> ~/.profile
    . ~/.profile  
    
    sudo ln -s /usr/local/lib/nodejs/node-v10.15.0/bin/node /usr/bin/node
    sudo ln -s /usr/local/lib/nodejs/node-v10.15.0/bin/npm /usr/bin/npm
    sudo ln -s /usr/local/lib/nodejs/node-v10.15.0/bin/npx /usr/bin/npx

    sudo npm install -g serve
    sudo ln -s /usr/local/lib/nodejs/node-v10.15.0/bin/serve /usr/bin/serve
    sudo apt install -y xsel

    npm --prefix /vagrant/catalog-frontend install
    npm --prefix /vagrant/catalog-frontend run build

    echo "Installing redis" 
    wget http://download.redis.io/redis-stable.tar.gz
    tar xvzf redis-stable.tar.gz
    cd redis-stable
    make
    make install

    redis-server &

    echo "Building frontend app" 
    npm install --prefix /vagrant/catalog-frontend
    npm run build --prefix /vagrant/catalog-frontend

    echo "Done installing your virtual machine!"
  SHELL
end
