{
  description="flake for heroui development";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.05";
  };
  outputs = { self, nixpkgs }:
    let
      linux = "x86_64-linux";
      aarch64 = "aarch64-darwin";
      buildInputs = pkgs: with pkgs; [
        pkgs.nodejs_22
        pkgs.pnpm
        pkgs.nodePackages.typescript-language-server
        pkgs.nodePackages.vscode-langservers-extracted
      ];
  in rec {
    devShells = {
        "${linux}".default = let pkgs = nixpkgs.legacyPackages."${linux}"; in
          pkgs.mkShell {
            buildInputs = buildInputs pkgs;
          };
        "${aarch64}".default = let pkgs = nixpkgs.legacyPackages."${aarch64}"; in
          pkgs.mkShell {
            buildInputs = buildInputs pkgs;
          };
      };
  };
}
