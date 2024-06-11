n = int(input())

for i in range(1, n+1):
    for j in range(n-i):
        print(" ", end=' ')
    h = 1
    for k in range(1, i+1):
        print(h, end=' ')
        h = h+1
    print()




