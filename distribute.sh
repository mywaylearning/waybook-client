#!/bin/bash

if ! hash jarsigner || ! hash zipalign
  then
    echo "Commands 'jarsigner' or 'zipalign' not found. Make sure that they are in your PATH config."
    exit 1
fi

APK_UNSIGNED_PATH="platforms/android/build/outputs/apk"
APK_UNSIGNED_NAME="/android-release-unsigned.apk"
APK_VERSION=$(awk '/widget/ {print $4}' FS='"' config.xml)

cp $APK_UNSIGNED_PATH/$APK_UNSIGNED_NAME ./
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mywaylearning.keystore ./$APK_UNSIGNED_NAME waybook
zipalign -v 4 ./$APK_UNSIGNED_NAME ./"Waybook"-"$APK_VERSION".apk

rm ./$APK_UNSIGNED_NAME
