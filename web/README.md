# Web

## Generic Constraint

```typescript
interface HasId {
  id?: number
}

class A<T extends HasId> {}
```

```typescript
class A<T extends B<K>, K> {}
```
