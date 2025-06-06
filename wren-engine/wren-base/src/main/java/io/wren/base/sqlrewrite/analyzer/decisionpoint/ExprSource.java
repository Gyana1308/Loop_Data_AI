/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.wren.base.sqlrewrite.analyzer.decisionpoint;

import io.trino.sql.tree.NodeLocation;

import java.util.Objects;

public record ExprSource(String expression, String sourceDataset, NodeLocation nodeLocation)
{
    @Override
    public boolean equals(Object o)
    {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ExprSource that = (ExprSource) o;
        return Objects.equals(expression, that.expression) &&
                Objects.equals(sourceDataset, that.sourceDataset)
                && Objects.equals(nodeLocation, that.nodeLocation);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(expression, sourceDataset, nodeLocation);
    }
}
