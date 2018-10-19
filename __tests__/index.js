import pipe from 'callbag-pipe'
import { listenable, willBe } from '@jeetiss/callbag-marble-tester'

import concatMap from '../src'

test('works well when inners source complete after main source', () =>
  pipe(
    listenable('--o----o-|'),
    concatMap(() => listenable('---i-j-|')),
    willBe('-----i-j--i-j-|'),
  ))

test('works well when inners source complete before main source', () =>
  pipe(
    listenable('-o--o---------------------|'),
    concatMap(() => listenable('-i-|')),
    willBe('--i--i--------------------|'),
  ))

test('works well when empty inners sources', () =>
  pipe(
    listenable('-o--o------o-o---o---o-o--|'),
    concatMap(() => listenable('|')),
    willBe('--------------------------|'),
  ))

test('works well with sync inners sources', () =>
  pipe(
    listenable('-o--o---|'),
    concatMap(() => listenable('a|')),
    willBe('-a--a---|'),
  ))

// test('works with pullable sources', () =>
//   pipe(
//     pullable('--a--b--c--|'),
//     concatMap(() => pullable('-q-w-|')),
//     willBe('-q-w--q-w--q-w-|'),
//   ))
