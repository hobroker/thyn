String fix(String path) => path.replaceAll(RegExp(r'(^\/+|\/+$)'), '');

main() {
	print(fix('/hello/one/'));
	print(fix('hello/two/three/fur//'));
	print(fix('//hello'));
}