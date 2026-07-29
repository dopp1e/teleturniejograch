{
  description = "Node.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [ pkgs.nodejs_22 ];

          shellHook = ''
            mkdir -p .direnv
            hashfile=".direnv/npm-lock-hash"
            lockfile="package-lock.json"

            if [ -f "$lockfile" ]; then
              current=$(sha256sum "$lockfile" | cut -d' ' -f1)
            else
              current=""
            fi

            if [ ! -d node_modules ] || [ "$current" != "$(cat "$hashfile" 2>/dev/null)" ]; then
              echo "Installing npm dependencies..."
              npm install \
                && sha256sum "$lockfile" 2>/dev/null | cut -d' ' -f1 > "$hashfile"
            fi
          '';
        };
      });
}