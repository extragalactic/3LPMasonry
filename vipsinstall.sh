#!/bin/sh

vips_version_minimum=8.2.2
vips_version_latest_major_minor=8.2
vips_version_latest_patch=2

install_libvips_from_source() {
  echo "Compiling libvips $vips_version_latest_major_minor.$vips_version_latest_patch from source"
  curl -O http://www.vips.ecs.soton.ac.uk/supported/$vips_version_latest_major_minor/vips-$vips_version_latest_major_minor.$vips_version_latest_patch.tar.gz
  tar zvxf vips-$vips_version_latest_major_minor.$vips_version_latest_patch.tar.gz
  cd vips-$vips_version_latest_major_minor.$vips_version_latest_patch
  ./configure --disable-debug --disable-docs --disable-static --disable-introspection --enable-cxx=yes --without-python --without-orc --without-fftw --with-webp $1
  make
  make install
  cd ..
  rm -rf vips-$vips_version_latest_major_minor.$vips_version_latest_patch
  rm vips-$vips_version_latest_major_minor.$vips_version_latest_patch.tar.gz
  ldconfig
  echo "Installed libvips $vips_version_latest_major_minor.$vips_version_latest_patch"
}

echo "Installing libvips dependencies via yum"
yum groupinstall -y "Development Tools"
yum install -y gtk-doc libxml2-devel libjpeg-turbo-devel libpng-devel libtiff-devel libexif-devel libgsf-devel lcms-devel ImageMagick-devel gobject-introspection-devel libwebp-devel curl
yum install -y libpng-devel libxml2-devel
install_libvips_from_source "--prefix=/usr"