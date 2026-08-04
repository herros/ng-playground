My angular playground, used to create stuff I am/was interested in....
It are different projects but you can clone them separately in the next way:

git clone --filter=blob:none --no-checkout https://github.com/herros/ng-playground.git
cd ng-playground
git sparse-checkout init --cone
git sparse-checkout set <<directory>> (e.g. u2a-schematics)
git checkout
